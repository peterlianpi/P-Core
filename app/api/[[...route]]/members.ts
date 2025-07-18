import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
//import { createId } from "@paralleldrive/cuid2";
import { v2 as cloudinary } from "cloudinary";
import { ensureUserInOrganization } from "@/lib/auth-helpers";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";
import { MemberSchema } from "@/features/members/schemas";
import { Prisma } from "@/prisma-features-database/features-database-client-types";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = new Hono()

  // // POST: Create new member
  // .post(
  //   "/",
  //   zValidator(
  //     "json",
  //     MemberFormSchema.omit({
  //       id: true,
  //     })
  //   ),
  //   zValidator(
  //     "query",
  //     z.object({
  //       orgId: z.string().optional(),
  //     })
  //   ),
  //   async (c) => {
  //     const values = c.req.valid("json");
  //     const { homeId, ...restValues } = values; // Exclude homeId from values
  //     const authResult = await ensureUserInOrganization(c);
  //     if ("json" in authResult) return authResult; // Return error if unauthorized
  //     const { organizationId } = authResult;

  //     try {
  //       // Insert new transaction
  //       const data = await featuresDBPrismaClient.student.create({
  //         data: {
  //           ...restValues, // Spread the remaining values
  //           ...(homeId ? { home: { connect: { id: homeId } } } : {}), // Connect only if homeId is defined
  //           organization: {
  //             connect: { id: organizationId },
  //           },
  //         },
  //       });
  //       return c.json(data, 201);
  //     } catch (err) {
  //       console.error(err);
  //       return c.json({ error: "Error creating member" }, 500);
  //     }
  //   }
  // )

  // Endpoint to bulk create students
  // .post(
  //   "/bulk-create",
  //   zValidator(
  //     "json",
  //     z.array(MemberBulkSchema.omit({ id: true })) // Expecting an array of member data
  //   ),
  //   zValidator(
  //     "query",
  //     z.object({
  //       orgId: z.string().optional(),
  //     })
  //   ),
  //   async (c) => {
  //     const students = c.req.valid("json");
  //     const authResult = await ensureUserInOrganization(c);
  //     if ("json" in authResult) return authResult; // Return error if unauthorized
  //     const { organizationId } = authResult;

  //     // Fetch all homes from the database with the correct type
  //     const homes = await featuresDBPrismaClient.home.findMany({});

  //     // Map home numbers to home IDs for easy lookup
  //     const homeMap: { [key: string]: number } = homes.reduce((map, home) => {
  //       map[home.homeNumber] = home.id; // Create a map of home number → homeId
  //       return map;
  //     }, {} as { [key: string]: number });

  //     try {
  //       const createdOrUpdatedMembers = [];
  //       for (const member of students) {
  //         // Match home number from import with home ID from database
  //         const homeId = homeMap[member.home] || null;

  //         console.log(
  //           `Member: ${member.name}, Home Number: ${member.home}, Matched Home ID: ${homeId}`
  //         );

  //         // Check if a member with the same name exists in the same home
  //         const existingMember = await featuresDBPrismaClient.student.findFirst({
  //           where: {
  //             name: member.name,
  //             homeId: homeId,
  //           },
  //         });

  //         if (existingMember) {
  //           createdOrUpdatedMembers.push({
  //             message: `Member ${member.name} already exists in home ${member.home}.`,
  //             member: existingMember,
  //           });
  //         } else {
  //           // Create the member if they don’t already exist in the same home
  //           const createdMember = await featuresDBPrismaClient.student.create({
  //             data: {
  //               name: member.name,
  //               phone: member.phone || undefined,
  //               gender: member.gender || undefined,
  //               home: homeId ? { connect: { id: homeId } } : undefined, // Connect to home if found
  //               organization: {
  //                 connect: { id: organizationId },
  //               },
  //             },
  //           });
  //           createdOrUpdatedMembers.push({
  //             message: `New member ${member.name} created in home ${member.home}.`,
  //             member: createdMember,
  //           });
  //         }
  //       }

  //       return c.json(
  //         {
  //           message: "Bulk member creation or update completed.",
  //           details: createdOrUpdatedMembers,
  //         },
  //         201
  //       );
  //     } catch (err) {
  //       console.error("Error creating/updating students:", err);
  //       return c.json(
  //         { error: "Error creating/updating students", details: err },
  //         500
  //       );
  //     }
  //   }
  // )

  // // PATCH: Update existing member by ID
  // .patch(
  //   "/:id",
  //   zValidator(
  //     "param",
  //     z.object({
  //       id: z
  //         .string()
  //         .min(1, "ID is required")
  //         .regex(/^\d+$/, "ID must be a numeric string"), // Ensure numeric ID
  //     })
  //   ),
  //   zValidator(
  //     "json",
  //     MemberFormSchema.omit({
  //       id: true,
  //     })
  //   ),
  //   zValidator(
  //     "query",
  //     z.object({
  //       orgId: z.string().optional(),
  //     })
  //   ),
  //   async (c) => {
  //     // Validate ID early
  //     const { id } = c.req.valid("param");

  //     if (!id || isNaN(Number(id))) {
  //       return c.json({ error: "Invalid or missing ID" }, 400);
  //     }

  //     const memberId = parseInt(id, 10); // Ensure it's a number

  //     // Check user authentication
  //     const authResult = await ensureUserInOrganization(c);
  //     if ("json" in authResult) return authResult; // Return error if unauthorized
  //     const { organizationId } = authResult;

  //     // Extract values from request
  //     const values = c.req.valid("json");

  //     try {
  //       // Check if member exists and retrieve current homeId
  //       const existedMember = await featuresDBPrismaClient.student.findFirst({
  //         where: { id: memberId, organizationId },
  //         select: { homeId: true },
  //       });

  //       if (!existedMember) {
  //         return c.json({ error: "Member not found" }, 404);
  //       }

  //       // Update the member, conditionally updating the home relationship
  //       const data = await featuresDBPrismaClient.student.update({
  //         where: { id: memberId, organizationId },
  //         data: {
  //           name: values.name,
  //           number: values.number,
  //           phone: values.phone,
  //           gender: values.gender,
  //           image: values.image,
  //           fbLink: values.fbLink,
  //           email: values.email,
  //           birthdate: values.birthdate,
  //           bloodType: values.bloodType,
  //           ...(values.homeId && existedMember.homeId !== values.homeId
  //             ? { home: { connect: { id: values.homeId } } }
  //             : { homeId: values.homeId }), // Explicitly set homeId if not changing
  //         },
  //       });

  //       return c.json(data);
  //     } catch (err) {
  //       console.error(err);
  //       return c.json({ error: "Error updating member" }, 500);
  //     }
  //   }
  // )

  // GET: Retrieve all students
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        take: z.string().optional(),
        skip: z.string().optional(),
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      try {
        const { take, skip } = c.req.valid("query");

        // Convert to number (handling undefined values with a fallback)
        const takeNumber = take ? Number(take) : 10; // Default to 0 if take is undefined
        const skipNumber = skip ? Number(skip) : 0; // Default to 0 if skip is undefined
        const authResult = await ensureUserInOrganization(c);
        if ("json" in authResult) return authResult; // Return error if unauthorized
        const { organizationId } = authResult;

        const students = await featuresDBPrismaClient.student.findMany({
          where: { orgId: organizationId },
          take: takeNumber,
          skip: skipNumber,
          orderBy: { id: "asc" }, // Change "asc" to "desc" for descending order
          select: {
            id: true,
            name: true,
            phone: true,
            gender: true,
            image: true,
            email: true,
            orgId: true,
            birthDate: true,
            address: true,
            guardian: true,
            joinedAt: true,
          },
        });

        const allMembers = students
          .map((member) => {
            const validation = MemberSchema.safeParse(member);
            if (!validation.success) {
              console.error("Validation failed for member:", validation.error);
              return null; // Skip invalid students
            }
            return (validation.data);
          })
          .filter((member) => member !== null);

        return c.json({
          data: allMembers,
          totalItems: await featuresDBPrismaClient.student.count({ where: { orgId: organizationId } }),
        });
      } catch (err) {
        console.error(err);
        return c.json({ error: "Error fetching students" }, 500);
      }
    }
  )

  // GET: Retrieve all students by search
  .get(
    "/search",
    zValidator(
      "query",
      z.object({
        take: z.string().optional(),
        skip: z.string().optional(),
        searchQuery: z.string().optional(),
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      try {
        const { take, skip, searchQuery } = c.req.valid("query");

        // Convert to number (handling undefined values with a fallback)
        const takeNumber = take ? Number(take) : 10; // Default to 0 if take is undefined
        const skipNumber = skip ? Number(skip) : 0; // Default to 0 if skip is undefined


        const authResult = await ensureUserInOrganization(c);
        if ("json" in authResult) return authResult; // Return error if unauthorized
        const { organizationId } = authResult;

        // Build search query filter if searchQuery is provided
        // Build search query filter if searchQuery is provided
        const searchFilter =
          searchQuery && searchQuery.trim().length > 0
            ? {
              OR: [
                {
                  name: {
                    contains: searchQuery,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  email: {
                    contains: searchQuery,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  phone: {
                    contains: searchQuery,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  home: {
                    is: {
                      homeNumber: {
                        contains: searchQuery,
                        mode: Prisma.QueryMode.insensitive,
                      },
                    },
                  },
                },
                // {
                //   home: {
                //     is: {
                //       veng: {
                //         is: {
                //           name: {
                //             contains: searchQuery,
                //             mode: Prisma.QueryMode.insensitive,
                //           },
                //         },
                //       },
                //     },
                //   },
                // },
                // {
                //   home: {
                //     is: {
                //       veng: {
                //         is: {
                //           khawk: {
                //             is: {
                //               name: {
                //                 contains: searchQuery,
                //                 mode: Prisma.QueryMode.insensitive,
                //               },
                //             },
                //           },
                //         },
                //       },
                //     },
                //   },
                // },
                // {
                //   roles: {
                //     some: {
                //       role: {
                //         name: {
                //           contains: searchQuery,
                //           mode: Prisma.QueryMode.insensitive,
                //         },
                //       },
                //     },
                //   },
                // },

              ],
            }
            : {};

        const students = await featuresDBPrismaClient.student.findMany({
          where: { orgId: organizationId, ...searchFilter },
          take: takeNumber,
          skip: skipNumber,
          orderBy: { id: "asc" }, // Change "asc" to "desc" for descending order
          select: {
            id: true,
            name: true,
            phone: true,
            gender: true,
            image: true,
            email: true,
            orgId: true,
            birthDate: true,
            address: true,
            guardian: true,
            joinedAt: true,
            courses: {
              select: {
                id: true,
                enrolledAt: true,
                course: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    level: true,

                    lessonBooks: {
                      select: {
                        id: true,
                        title: true, author: true,

                        progress: {
                          select: {
                            id: true,
                            completed: true,
                          }
                        }
                      },
                    }
                  },
                },

              },
            }
          },
        });

        const allMembers = students
          .map((member) => {
            const validation = MemberSchema.safeParse(member);
            if (!validation.success) {
              console.error("Validation failed for member:", validation.error);
              return null; // Skip invalid students
            }
            return (validation.data);
          })
          .filter((member) => member !== null);

        return c.json({
          data: allMembers,
          totalItems: await featuresDBPrismaClient.student.count({
            where: { orgId: organizationId, ...searchFilter },
          }),
        });
      } catch (err) {
        console.error(err);
        return c.json({ error: "Error fetching students" }, 500);
      }
    }
  )

  // GET: Retrieve a specific member by ID (No changes needed)
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })), // Validate id as a string
    zValidator("query", z.object({ orgId: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param"); // Extract id from params
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      try {
        const member = await featuresDBPrismaClient.student.findUnique({
          where: { id: id, orgId: organizationId },
          select: {
            id: true,
            name: true,
            phone: true,
            gender: true,
            image: true,
            email: true,
            orgId: true,
            birthDate: true,
            address: true,
            guardian: true,
            joinedAt: true,
          },
        });

        if (!member) {
          return c.json({ error: "Member not found" }, 404);
        }

        const validation = MemberSchema.safeParse(member);
        if (!validation.success) {
          console.error("Validation failed for member:", validation.error);
          return c.json({ error: "Invalid member data" }, 400);
        }

        return c.json((validation.data));
      } catch (err) {
        console.error("Error fetching member:", err);
        return c.json({ error: "Error fetching member" }, 500);
      }
    }
  )

// // Endpoint to delete a member by ID
// .delete(
//   "/:id",

//   zValidator(
//     "param",
//     z.object({
//       id: z.string().optional(),
//     })
//   ),
//   zValidator(
//     "query",
//     z.object({
//       orgId: z.string().optional(),
//     })
//   ),
//   async (c) => {
//     // const auth = getAuth(c);
//     const { id } = c.req.valid("param");
//     const authResult = await ensureUserInOrganization(c);
//     if ("json" in authResult) return authResult; // Return error if unauthorized
//     const { organizationId } = authResult;

//     if (!id || isNaN(Number(id))) {
//       return c.json({ error: "Invalid or missing ID" }, 400);
//     }

//     const memberId = parseInt(id as string, 10); // Convert id to number if needed

//     // Validate ID and authentication
//     if (!memberId) {
//       return c.json({ error: "Missing id" }, 400);
//     }

//     // if (!auth?.userId) {
//     //   return c.json({ error: "Unauthorized" }, 401);
//     // }

//     // Identify students to delete

//     // Delete students
//     const data = await featuresDBPrismaClient.student.delete({
//       where: {
//         id: memberId,
//         organizationId,
//       },
//     });
//     // Handle case where data is not found
//     if (!data) {
//       return c.json({ error: "Not found" }, 404);
//     }
//     return c.json(data);
//   }
// );

export default app;
