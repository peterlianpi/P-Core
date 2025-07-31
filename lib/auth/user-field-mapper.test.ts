import { mapUserFieldsForAuth } from "./user-field-mapper";
import { UserRole } from "@prisma/client";

describe("mapUserFieldsForAuth", () => {
  it("should map all expected user fields correctly", () => {
    // Mock user object with all possible fields
    const mockUser = {
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
      role: UserRole.ADMIN,
      isTwoFactorEnabled: true,
      defaultOrgId: "org-456",
      image: "https://example.com/avatar.png",
      isOAuth: true,
      // Extra fields that should NOT be included
      password: "supersecret",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Map fields for auth
    const result = mapUserFieldsForAuth(mockUser);

    // Assert only the expected fields are present
    expect(result).toEqual({
      id: "user-123",
      name: "Test User",
      email: "test@example.com",
      role: UserRole.ADMIN,
      isTwoFactorEnabled: true,
      defaultOrgId: "org-456",
      image: "https://example.com/avatar.png",
      isOAuth: true,
    });
  });

  it("should set defaults for missing optional fields", () => {
    const mockUser = {
      id: "user-456",
      name: "No Image",
      email: "noimage@example.com",
      role: UserRole.USER,
      isTwoFactorEnabled: false,
      // defaultOrgId, image, isOAuth are missing
    };

    const result = mapUserFieldsForAuth(mockUser);

    expect(result).toEqual({
      id: "user-456",
      name: "No Image",
      email: "noimage@example.com",
      role: UserRole.USER,
      isTwoFactorEnabled: false,
      defaultOrgId: null,
      image: null,
      isOAuth: false,
    });
  });
});
