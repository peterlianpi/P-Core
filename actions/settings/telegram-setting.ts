/**
 * Telegram Settings Actions
 * Server actions for Telegram settings management (frontend-only system)
 */

'use server';

import { z } from 'zod';
import { currentUser } from '@/lib/auth';

const getTelegramSettingSchema = z.object({
  userId: z.string(),
  role: z.string().optional(),
});

type GetTelegramSettingInput = z.infer<typeof getTelegramSettingSchema>;

export async function getTelegramSetting(input: GetTelegramSettingInput) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return null;
    }

    const validatedInput = getTelegramSettingSchema.parse(input);

    // In a frontend-only system, return mock Telegram settings
    // In a real system, this would query the database
    const mockTelegramSettings = {
      userId: validatedInput.userId,
      telegramChatId: '@demo_chat_123',
      telegramBotToken: validatedInput.role === 'SUPERADMIN' ? 'demo_bot_token_456' : undefined,
      isActive: true,
    };

    return mockTelegramSettings;
  } catch (error) {
    console.error('Failed to get Telegram settings:', error);
    return null;
  }
}

export async function updateTelegramSetting(input: {
  userId: string;
  telegramChatId?: string;
  telegramBotToken?: string;
  isActive?: boolean;
}) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      };
    }

    // In a frontend-only system, simulate updating Telegram settings
    console.log('Updating Telegram settings for user:', user.id, input);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      success: true,
      message: 'Telegram settings updated successfully',
    };
  } catch (error) {
    console.error('Failed to update Telegram settings:', error);
    return {
      success: false,
      error: 'Failed to update Telegram settings',
    };
  }
}
