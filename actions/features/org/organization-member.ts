// "use server";

// import { db } from "@/lib/db";
// import { handleError } from "./organization"; // Reuse the error handler
// import { OrganizationUserRole } from "@prisma/client";

// export async function getUserByOrgId({ orgId }: { orgId: string }) {
//   try {
//     const users = await db.userOrganization.findMany({
//       where: {
//         organizationId: orgId,
//       },
//       include: {
//         user: {
//           select: {
//             name: true,
//           },
//         },
//         organization: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     });

//     return { success: users };
//   } catch (error: unknown) {
//     return handleError(error, "Failed to fetch user with organization id");
//   }
// }

// export async function addUserToOrganization({
//   userId,
//   organizationId,
//   role,
// }: {
//   userId: string;
//   organizationId: string;
//   role: OrganizationUserRole;
// }) {
//   try {
//     const added = await db.userOrganization.create({
//       data: { userId, organizationId, role },
//     });

//     return { success: added };
//   } catch (error: unknown) {
//     return handleError(error, "Failed to add user to organization");
//   }
// }

// export async function updateUserRole({
//   userId,
//   organizationId,
//   role,
// }: {
//   userId: string;
//   organizationId: string;
//   role: OrganizationUserRole;
// }) {
//   try {
//     const updated = await db.userOrganization.update({
//       where: {
//         userId_organizationId: { userId, organizationId },
//       },
//       data: { role },
//     });

//     return { success: updated };
//   } catch (error: unknown) {
//     return handleError(error, "Failed to update user role");
//   }
// }

// export async function removeUserFromOrganization({
//   userId,
//   organizationId,
// }: {
//   userId: string;
//   organizationId: string;
// }) {
//   try {
//     const deleted = await db.userOrganization.delete({
//       where: {
//         userId_organizationId: { userId, organizationId },
//       },
//     });

//     return { success: deleted };
//   } catch (error: unknown) {
//     return handleError(error, "Failed to remove user from organization");
//   }
// }
