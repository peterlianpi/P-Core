"use server";

import { RegisterSchema } from "@/lib/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "../../lib/tokens";
import { sendVerificationEmail } from "@/lib/mail/mail";
import { trackRegister } from "./track-system-activities";
import { prisma } from "@/lib/db/client";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Delete any old tokens for this email
  await prisma.verificationToken.deleteMany({ where: { email } });

  // Generate a new token value
  const tokenValue = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token: tokenValue,
      expires: new Date(Date.now() + 1000 * 60 * 10), // 10 min expiry
    },
  });

  // Send the email using the token just saved
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  await trackRegister({ value: email });

  return {
    success: "Confirmation email sent!",
  };
};
