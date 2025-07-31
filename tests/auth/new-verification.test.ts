import { describe, it, expect, beforeEach } from "vitest";
import { newVerification } from "@/actions/auth/new-verification";
import { prisma } from "@/lib/db/client";

// Clean up before each test for isolation
beforeEach(async () => {
  await prisma.verificationToken.deleteMany({});
  await prisma.user.deleteMany({});
});

describe("Email Verification", () => {
  it("verifies a user with a valid token", async () => {
    const user = await prisma.user.create({ data: { email: "test@example.com", password: "hashed" } });
    const token = await prisma.verificationToken.create({
      data: {
        email: user.email,
        token: "valid-token",
        expires: new Date(Date.now() + 1000 * 60 * 10), // 10 min from now
      },
    });

    const result = await newVerification("valid-token");
    expect(result.success).toBe("Email verified!");
    const deletedToken = await prisma.verificationToken.findUnique({ where: { token: "valid-token" } });
    expect(deletedToken).toBeNull();
  });

  it("returns error for expired token", async () => {
    const user = await prisma.user.create({ data: { email: "test2@example.com", password: "hashed" } });
    await prisma.verificationToken.create({
      data: {
        email: user.email,
        token: "expired-token",
        expires: new Date(Date.now() - 1000 * 60), // expired
      },
    });

    const result = await newVerification("expired-token");
    expect(result.error).toBe("Token has expired!");
  });

  it("returns error for non-existent token", async () => {
    const result = await newVerification("no-such-token");
    expect(result.error).toBe("Token does not exist!");
  });

  it("returns error for non-existent user", async () => {
    await prisma.verificationToken.create({
      data: {
        email: "ghost@example.com",
        token: "ghost-token",
        expires: new Date(Date.now() + 1000 * 60 * 10),
      },
    });

    const result = await newVerification("ghost-token");
    expect(result.error).toBe("Email does not exist!");
  });
});
