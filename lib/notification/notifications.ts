// import { db } from "@/lib/db";
// import { sendTelegramLog } from "@/lib/telegram";
// import { UserRole } from "@/prisma-user-database/user-database-client-types";

// type NotifyOptions = {
//   actorUserId: string;
//   title: string;
//   message: string;
//   type?: "INFO" | "WARNING" | "ERROR";
// };

// export const notifySuperadminsAndOrgMembers = async ({
//   actorUserId,
//   title,
//   message,
//   type = "INFO",
// }: NotifyOptions) => {
//   const actor = await db.user.findUnique({
//     where: { id: actorUserId },
//     include: { organization: true },
//   });

//   if (!actor) return;

//   const [superAdmins, orgUsers] = await Promise.all([
//     db.user.findMany({
//       where: { role: UserRole.SUPERADMIN },
//     }),
//     actor.organization
//       ? db.user.findMany({
//           where: {
//             organizationId: actor.organizationId,
//           },
//         })
//       : [],
//   ]);

//   // Create a unique set of recipients by ID
//   const uniqueUsersMap = new Map<string, typeof actor>();
//   for (const user of [...superAdmins, ...orgUsers]) {
//     uniqueUsersMap.set(user.id, user);
//   }

//   await Promise.all(
//     Array.from(uniqueUsersMap.values()).map((user) =>
//       sendTelegramLog({
//         userId: user.id,
//         role: user.role,
//         title,
//         message,
//         type,
//       })
//     )
//   );
// };
