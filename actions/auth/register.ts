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

  const verificationToken = await generateVerificationToken(email);
  // TODO: Send verification token email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  await trackRegister({ value: email });

  return {
    success: "Confirmation email sent!",
  };
};
