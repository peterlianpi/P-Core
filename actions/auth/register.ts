"use server";

import { RegisterSchema } from "@/lib/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "../../lib/tokens";
import { sendVerificationEmail } from "@/lib/mail/mail";
import { trackRegister } from "./track-system-activities";
import { db } from "@/lib/db";
import { UserRole, OrganizationRole, OrgType } from "@/types/auth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, role, companyName } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Map registration role to UserRole
  let userRole: UserRole;
  switch (role) {
    case "admin":
      userRole = UserRole.ADMIN;
      break;
    case "company":
      userRole = UserRole.USER; // Company owners start as USER, but will be OWNER in their org
      break;
    case "user":
    default:
      userRole = UserRole.USER;
      break;
  }

  // Create user
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: userRole,
    },
  });

  // If registering as company, create organization and make user the owner
  if (role === "company" && companyName) {
    const organization = await db.organization.create({
      data: {
        name: companyName,
        type: OrgType.COMPANY,
        ownerId: user.id,
        description: `${companyName} - Created during registration`,
      },
    });

    // Add user as owner of the organization
    await db.userOrganization.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.OWNER,
      },
    });

    // Set default organization for user
    await db.user.update({
      where: { id: user.id },
      data: { defaultOrgId: organization.id },
    });
  }

  // Generate and store a secure, hashed verification token; returns plain token for email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.identifier, verificationToken.token);

  await trackRegister({ value: email });

  return {
    success: "Confirmation email sent!",
  };
};
