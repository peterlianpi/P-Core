"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { uploadImageSettings } from "@/data/upload-image-cloudinary";
import { sendVerificationEmail } from "@/lib/email-templates";
import {
  trackEmailChange,
  trackPasswordChange,
  trackTwoFactorDisabled,
  trackTwoFactorEnabled,
} from "../auth/track-system-activities";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    await db.user.update({
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
        return { error: fileLink.error }; // Return the error from uploadFileToFilebase
      }
    } catch (error) {
      console.error("Error during file upload:", error); // Log the actual error for debugging
      return { error: "Error uploading image." };
    }
  }

  // Telegram settings
  if (telegramChatId && telegramBotToken) {
    await db.telegramSetting.upsert({
      where: { userId_role: { userId: dbUser.id, role: dbUser.role } }, // assumes composite unique
      update: {
        role: values.role,
        chatId: telegramChatId,
        botToken: telegramBotToken,
      },
      create: {
        userId: dbUser.id,
        role: dbUser.role,
        scope: dbUser.role === "SUPERADMIN" ? "SUPERADMIN" : "USER",
        chatId: telegramChatId,
        botToken: telegramBotToken,
      },
    });
  }

  // Update the user in the database, including the image URL if provided
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...userValues,
      defaultOrgId: values?.defaultOrgId,
      image: link,
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
