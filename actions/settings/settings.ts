"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/lib/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { uploadImageSettings } from "@/data/upload-image-cloudinary";
import { sendVerificationEmail } from "@/lib/mail/email-templates";
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

  // Handle the image upload if there is an image file
  let link = "";
  if (values.image) {
    try {
      const fileLink = await uploadImageSettings(values.image);

      if (typeof fileLink === "string") {
        link = fileLink; // Assign the successful file link
      } else if (fileLink && fileLink.error) {
        return { error: fileLink.error }; // Return the error from uploadImageSettings
      }
    } catch (error) {
      console.error("Error during file upload:", error); // Log the actual error for debugging
      return { error: "Error uploading image." };
    }
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

  // Update the user in the database, including the image URL if provided
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...userValues,
      image: link || dbUser.image, // Keep existing image if no new image uploaded
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
