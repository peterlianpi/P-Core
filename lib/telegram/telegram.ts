import { LogType, UserRole } from "@prisma/client";
import { prisma } from "../db/client";


async function getTelegramSettings(
  userId?: string,
  role?: UserRole,
  orgId?: string
) {
  try {
    let settings = [];

    if (role === "SUPERADMIN") {
      settings = await prisma.telegramSetting.findMany({
        where: { scope: "SUPERADMIN" },
      });
    } else if (role === "ADMIN") {
      settings = await prisma.telegramSetting.findMany({
        where: {
          OR: [
            { scope: "ORG", orgId },
            { scope: "USER", userId },
          ],
        },
      });
    } else {
      settings = await prisma.telegramSetting.findMany({
        where: { scope: "USER", userId },
      });
    }

    // If no database settings found, use environment variables as fallback
    if (settings.length === 0 && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      return [{
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
        scope: role || "USER",
        userId: userId,
        orgId: orgId,
      }];
    }

    return settings;
  } catch (error) {
    console.warn("Telegram settings not configured in database, checking environment variables:", error);
    
    // Fallback to environment variables if database is not available
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      return [{
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
        scope: role || "USER",
        userId: userId,
        orgId: orgId,
      }];
    }
    
    return []; // Return empty array if no telegram configuration available
  }
}

export async function sendTelegramLog({
  userId,
  orgId,
  role,
  title,
  message,
  type = "INFO",
  metadata,
}: {
  userId?: string;
  orgId?: string;
  role?: UserRole;
  title: string;
  message: string;
  type?: LogType;
  metadata?: Record<string, unknown>;
}) {
  const timestamp = new Date().toISOString();
  const logId = `LOG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Enhanced logging context
  const logContext = {
    logId,
    timestamp,
    userId: userId || "SYSTEM",
    orgId: orgId || null,
    role: role || "SYSTEM",
    type,
    environment: process.env.NODE_ENV || "unknown",
    ...metadata,
  };

  console.log(`📋 [${type}] Telegram Log Request:`, {
    title,
    context: logContext,
    hasOrgId: !!orgId,
    hasUserId: !!userId,
  });

  try {
    const settings = await getTelegramSettings(userId, role, orgId);
    
    if (settings.length === 0) {
      console.warn(`⚠️ No Telegram settings found for logging:`, {
        userId,
        role,
        orgId,
        fallbackAttempted: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)
      });
    }

    // Enhanced database logging with better error handling
    try {
      const logData: {
        name: string;
        message: string;
        updatedBy: string;
        type?: LogType;
        date: Date;
        orgId?: string;
      } = {
        name: title.substring(0, 100), // Ensure title fits DB constraints
        message: message.substring(0, 1000), // Prevent overly long messages
        updatedBy: userId || "SYSTEM",
        type,
        date: new Date(),
      };

      // Enhanced org ID validation
      if (orgId) {
        // Verify organization exists before logging
        const orgExists = await prisma.organization.findUnique({
          where: { id: orgId },
          select: { id: true }
        });
        
        if (orgExists) {
          logData.orgId = orgId;
        } else {
          console.warn(`⚠️ Organization ${orgId} not found, logging without orgId`);
        }
      }

      const savedLog = await prisma.updateLog.create({
        data: logData,
      });

      console.log(`✅ Database log saved:`, {
        logId: savedLog.id,
        title: savedLog.name,
        orgId: savedLog.orgId,
        type: savedLog.type,
      });

    } catch (dbError: unknown) {
      const error = dbError as Error & { code?: string };
      console.error(`❌ Database logging failed:`, {
        error: error.message,
        code: error.code,
        userId,
        orgId,
        title: title.substring(0, 50),
      });
      
      // Don't fail the entire function if DB logging fails
      // Telegram notification is still valuable even without DB storage
    }

    // Enhanced Telegram messaging with retry logic
    const telegramResults = await Promise.allSettled(
      settings.map(async (setting, index) => {
        const TELEGRAM_API_URL = `https://api.telegram.org/bot${setting.botToken}/sendMessage`;
        
        const formattedMessage = formatTelegramMessage(title, message, logContext);
        
        try {
          const response = await fetch(TELEGRAM_API_URL, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "User-Agent": "P-Core-Logger/1.0"
            },
            body: JSON.stringify({
              chat_id: setting.chatId,
              text: formattedMessage,
              parse_mode: "Markdown",
              disable_notification: type === "INFO", // Don't notify for INFO logs
            }),
            signal: AbortSignal.timeout(10000), // 10 second timeout
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
          }

          const result = await response.json();
          console.log(`✅ Telegram message sent successfully:`, {
            settingIndex: index,
            chatId: setting.chatId,
            messageId: result.message_id,
            logId,
          });

          return { success: true, settingIndex: index, messageId: result.message_id };

        } catch (telegramError: unknown) {
          const error = telegramError as Error;
          console.error(`❌ Telegram send failed for setting ${index}:`, {
            error: error.message,
            chatId: setting.chatId,
            logId,
            isTimeout: error.name === 'TimeoutError',
            isNetworkError: error.name === 'TypeError',
          });
          
          return { success: false, settingIndex: index, error: error.message };
        }
      })
    );

    // Log summary of Telegram delivery results
    const successful = telegramResults.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;
    
    const failed = telegramResults.length - successful;
    
    console.log(`📊 Telegram delivery summary:`, {
      logId,
      total: settings.length,
      successful,
      failed,
      title: title.substring(0, 50),
    });

    if (failed > 0) {
      console.warn(`⚠️ Some Telegram deliveries failed:`, {
        failures: telegramResults
          .filter(result => result.status === 'rejected' || 
                 (result.status === 'fulfilled' && !result.value.success))
          .map(result => result.status === 'fulfilled' ? result.value : result.reason)
      });
    }

  } catch (globalError: unknown) {
    const error = globalError as Error;
    console.error(`💥 Critical error in sendTelegramLog:`, {
      error: error.message,
      stack: error.stack,
      logId,
      title: title.substring(0, 50),
      hasUserId: !!userId,
      hasOrgId: !!orgId,
    });
    
    // Even if everything fails, we shouldn't throw to prevent breaking calling code
    // This is a logging function and should be resilient
  }
}

// Helper function to format Telegram messages consistently
function formatTelegramMessage(title: string, message: string, context: Record<string, unknown>): string {
  const emoji = getTypeEmoji(context.type);
  const timestamp = new Date().toLocaleString();
  
  let formattedMessage = `${emoji} *${title}*\n\n${message}`;
  
  // Add context information for non-INFO logs
  if (context.type !== "INFO") {
    formattedMessage += `\n\n_Context:_`;
    if (context.orgId) formattedMessage += `\n• Org: \`${context.orgId}\``;
    if (context.userId && context.userId !== "SYSTEM") formattedMessage += `\n• User: \`${context.userId}\``;
    formattedMessage += `\n• Time: ${timestamp}`;
    formattedMessage += `\n• Env: ${context.environment}`;
  }
  
  formattedMessage += `\n\n_P-Core System Log_`;
  
  return formattedMessage;
}

function getTypeEmoji(type: string): string {
  switch (type) {
    case "ERROR": return "🚨";
    case "WARNING": return "⚠️";
    case "INFO": return "ℹ️";
    default: return "📝";
  }
}
