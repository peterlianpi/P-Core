"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/lib/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail/mail";
import {
  trackEmailChange,
  trackPasswordChange,
  trackTwoFactorDisabled,
  trackTwoFactorEnabled,
} from "../auth/track-system-activities";
import { prisma } from "@/lib/db/client";

// Update settings
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  // Destructure values to separate Telegram fields
  const { telegramChatId, telegramBotToken, ...userValues } = values;


  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    // Save the token and pending email in the database
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { email: values.email, emailVerified: null },
    });

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    await trackEmailChange({ old: user.email ?? "", new: values.email });

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    values.password = await bcrypt.hash(values.newPassword, 10);
    values.newPassword = undefined;

    await trackPasswordChange({ value: user.email ?? "Unknown" });
  }


  // Telegram settings - Only if both values are provided
  if (telegramChatId && telegramBotToken) {
    const scope = dbUser.role === "SUPERADMIN" ? "SUPERADMIN" : "USER";

    // Find existing setting for this user with no organization (global setting)
    const existingSetting = await prisma.telegramSetting.findFirst({
      where: {
        userId: dbUser.id,
        orgId: { equals: null }, // Explicitly check for null
        scope: scope,
      },
    });

    if (existingSetting) {
      // Update existing setting
      await prisma.telegramSetting.update({
        where: { id: existingSetting.id },
        data: {
          chatId: telegramChatId,
          botToken: telegramBotToken,
          isActive: true,
        },
      });
    } else {
      // Create new setting (orgId will be null by default since it's optional)
      await prisma.telegramSetting.create({
        data: {
          userId: dbUser.id,
          scope: scope,
          chatId: telegramChatId,
          botToken: telegramBotToken,
          isActive: true,
        },
      });
    }
  }

  // Track image change if the image is being updated and is different
  if (typeof values.image !== 'undefined' && values.image !== dbUser.image) {
    console.log(`User image changed for userId=${dbUser.id}:`, {
      oldImage: dbUser.image,
      newImage: values.image,
    });
    // You can replace this with a more robust logger or tracking system if needed
  }

  // Sanitize defaultOrgId: convert empty string to null for safe FK update
if (typeof userValues.defaultOrgId === "string" && userValues.defaultOrgId.trim() === "") {
  userValues.defaultOrgId = undefined;
}

  // Update the user in the database, including the image URL if provided
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...userValues,
      image: values.image, // Only update if provided
    },
  });

  const twoFactorJustEnabled =
    !dbUser.isTwoFactorEnabled && values.isTwoFactorEnabled;

  const twoFactorJustDisabled =
    dbUser.isTwoFactorEnabled && !values.isTwoFactorEnabled;

  if (twoFactorJustEnabled) {
    await trackTwoFactorEnabled({ value: user.email ?? "Unknown" });
  } else if (twoFactorJustDisabled) {
    await trackTwoFactorDisabled({ value: user.email ?? "Unknown" });
  }

  return { success: "Settings Updated!" };
};
