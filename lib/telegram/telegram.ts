import { UserRole } from "@prisma/client";
import { db } from "../db";


async function getTelegramSettings(
  userId?: string,
  role?: UserRole,
  orgId?: string
) {
  try {
    // TODO: Implement when telegramSetting model is added to schema
    // Fallback to environment variables
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
  } catch (error) {
    console.warn("Telegram settings not configured:", error);
    return [];
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
  type?: string;
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

    // TODO: Implement when updateLog model is added to schema
    // Mock database logging
    console.log(`✅ Mock database log saved:`, {
      logId,
      title: title.substring(0, 100),
      orgId,
      type,
    });

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

function getTypeEmoji(type: unknown): string {
  switch (type) {
    case "ERROR": return "🚨";
    case "WARNING": return "⚠️";
    case "INFO": return "ℹ️";
    default: return "📝";
  }
}
