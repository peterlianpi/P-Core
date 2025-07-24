// Enhanced Choirs API Routes
// Music ministry management with member tracking and song repertoire
// Integrates with RLS-based security for automatic tenant isolation

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";

// Choir schemas
const ChoirSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
  director: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

const ChoirMemberSchema = z.object({
  memberId: z.string(),
  voice: z.enum(["SOPRANO", "ALTO", "TENOR", "BASS", "SOPRANO_1", "SOPRANO_2", "ALTO_1", "ALTO_2", "TENOR_1", "TENOR_2", "BASS_1", "BASS_2"]).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ON_LEAVE", "ALUMNI"]).default("ACTIVE"),
});

const SongSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().optional().nullable(),
  composer: z.string().optional().nullable(),
  key: z.string().optional().nullable(),
  tempo: z.string().optional().nullable(),
  lyrics: z.string().optional().nullable(),
  sheetMusic: z.string().optional().nullable(),
  audioFile: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
});

const ChoirEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  eventDate: z.string(),
  location: z.string().optional().nullable(),
  isPublic: z.boolean().default(false),
});

const choirs = new Hono()
  // Apply organization security middleware to all routes
  .use("*", organizationSecurityMiddleware)

  // GET /api/choirs - Get all choirs
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        take: z.string().optional(),
        skip: z.string().optional(),
        searchQuery: z.string().optional(),
        isActive: z.string().optional(),
        includeMemberCount: z.string().optional(),
        includeSongCount: z.string().optional(),
        includeUpcomingEvents: z.string().optional(),
      })
    ),
    requirePermission("read:choirs"),
    async (c) => {
      try {
        const { 
          take = "20", 
          skip = "0", 
          searchQuery, 
          isActive = "true",
          includeMemberCount = "true",
          includeSongCount = "true",
          includeUpcomingEvents = "false"
        } = c.req.valid("query");

        const takeNumber = parseInt(take);
        const skipNumber = parseInt(skip);
        const activeFilter = isActive === "true";

        // Build where clause
        const where: any = {
          isActive: activeFilter,
        };

        if (searchQuery) {
          where.OR = [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            { director: { contains: searchQuery, mode: "insensitive" } },
          ];
        }

        // Get choirs with optional related data
        const includeClause: any = {};
        
        if (includeMemberCount === "true") {
          includeClause.members = {
            where: { status: "ACTIVE" },
            include: {
              member: {
                select: { id: true, name: true, image: true }
              }
            }
          };
        }

        if (includeSongCount === "true") {
          includeClause.songs = {
            include: {
              song: {
                select: { id: true, title: true, artist: true }
              }
            }
          };
        }

        if (includeUpcomingEvents === "true") {
          includeClause.events = {
            where: {
              eventDate: {
                gte: new Date()
              }
            },
            orderBy: { eventDate: "asc" },
            take: 5
          };
        }

        const [choirs, totalCount, activeCount, inactiveCount] = await Promise.all([
          prisma.choir.findMany({
            where,
            take: takeNumber,
            skip: skipNumber,
            orderBy: { name: "asc" },
            include: includeClause
          }),
          prisma.choir.count({ where }),
          prisma.choir.count({ where: { isActive: true } }),
          prisma.choir.count({ where: { isActive: false } })
        ]);

        // Calculate additional statistics
        let totalMembers = 0;
        let totalSongs = 0;
        let upcomingEvents = 0;
        const voicePartStats = {
          soprano: 0,
          alto: 0,
          tenor: 0,
          bass: 0,
        };

        choirs.forEach(choir => {
          if (choir.members) {
            totalMembers += choir.members.length;
            choir.members.forEach(member => {
              if (member.voice) {
                const voicePart = member.voice.toLowerCase();
                if (voicePart.includes('soprano')) voicePartStats.soprano++;
                else if (voicePart.includes('alto')) voicePartStats.alto++;
                else if (voicePart.includes('tenor')) voicePartStats.tenor++;
                else if (voicePart.includes('bass')) voicePartStats.bass++;
              }
            });
          }
          if (choir.songs) {
            totalSongs += choir.songs.length;
          }
          if (choir.events) {
            upcomingEvents += choir.events.length;
          }
        });

        return c.json({
          data: choirs,
          totalItems: totalCount,
          active: activeCount,
          inactive: inactiveCount,
          totalMembers,
          totalSongs,
          upcomingEvents: includeUpcomingEvents === "true" ? 
            choirs.flatMap(choir => choir.events || []) : [],
          voicePartStats,
          choirStats: {
            averageMembersPerChoir: activeCount > 0 ? Math.round(totalMembers / activeCount) : 0,
            averageSongsPerChoir: activeCount > 0 ? Math.round(totalSongs / activeCount) : 0,
            mostActiveChoir: choirs.reduce((max, choir) => 
              (choir.members?.length || 0) > (max.members?.length || 0) ? choir : max, 
              choirs[0]
            ),
            newestChoir: choirs.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )[0]
          }
        });

      } catch (error) {
        console.error("Get choirs error:", error);
        return c.json({ error: "Failed to fetch choirs" }, 500);
      }
    }
  )

  // POST /api/choirs - Create new choir
  .post(
    "/",
    zValidator("json", ChoirSchema),
    requirePermission("write:choirs"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const choirData = c.req.valid("json");

        // Check for existing choir name
        const existingChoir = await prisma.choir.findFirst({
          where: { 
            name: choirData.name,
            isActive: true 
          }
        });

        if (existingChoir) {
          return c.json({ error: "Choir name already exists", code: "NAME_ALREADY_EXISTS" }, 409);
        }

        const choir = await prisma.choir.create({
          data: {
            ...choirData,
            orgId: orgContext.organizationId,
          },
          include: {
            members: {
              include: {
                member: {
                  select: { id: true, name: true, image: true }
                }
              }
            },
            songs: {
              include: {
                song: {
                  select: { id: true, title: true, artist: true }
                }
              }
            }
          }
        });

        return c.json(choir, 201);

      } catch (error) {
        console.error("Create choir error:", error);
        return c.json({ error: "Failed to create choir" }, 500);
      }
    }
  )

  // GET /api/choirs/:id - Get specific choir
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    requirePermission("read:choirs"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");

        const choir = await prisma.choir.findUnique({
          where: { id },
          include: {
            members: {
              where: { status: "ACTIVE" },
              include: {
                member: {
                  select: { 
                    id: true, 
                    name: true, 
                    image: true, 
                    birthDate: true,
                    phone: true,
                    email: true 
                  }
                }
              },
              orderBy: [
                { voice: "asc" },
                { member: { name: "asc" } }
              ]
            },
            songs: {
              include: {
                song: {
                  select: { 
                    id: true, 
                    title: true, 
                    artist: true, 
                    composer: true,
                    key: true,
                    tempo: true,
                    tags: true
                  }
                }
              },
              orderBy: { addedAt: "desc" }
            },
            events: {
              where: {
                eventDate: {
                  gte: new Date()
                }
              },
              orderBy: { eventDate: "asc" }
            }
          }
        });

        if (!choir) {
          return c.json({ error: "Choir not found", code: "CHOIR_NOT_FOUND" }, 404);
        }

        return c.json(choir);

      } catch (error) {
        console.error("Get choir error:", error);
        return c.json({ error: "Failed to fetch choir" }, 500);
      }
    }
  )

  // PATCH /api/choirs/:id - Update choir
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", ChoirSchema.partial()),
    requirePermission("write:choirs"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const updateData = c.req.valid("json");

        const choir = await prisma.choir.findUnique({
          where: { id }
        });

        if (!choir) {
          return c.json({ error: "Choir not found", code: "CHOIR_NOT_FOUND" }, 404);
        }

        const updatedChoir = await prisma.choir.update({
          where: { id },
          data: updateData,
          include: {
            members: {
              include: {
                member: {
                  select: { id: true, name: true, image: true }
                }
              }
            }
          }
        });

        return c.json(updatedChoir);

      } catch (error) {
        console.error("Update choir error:", error);
        return c.json({ error: "Failed to update choir" }, 500);
      }
    }
  )

  // DELETE /api/choirs/:id - Delete choir
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    requirePermission("delete:choirs"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");

        const choir = await prisma.choir.findUnique({
          where: { id }
        });

        if (!choir) {
          return c.json({ error: "Choir not found", code: "CHOIR_NOT_FOUND" }, 404);
        }

        // Soft delete by setting isActive to false
        await prisma.choir.update({
          where: { id },
          data: { isActive: false }
        });

        // Deactivate all choir members
        await prisma.choirMember.updateMany({
          where: { choirId: id, status: "ACTIVE" },
          data: { 
            status: "INACTIVE",
            leftAt: new Date()
          }
        });

        return c.json({ message: "Choir deleted successfully" });

      } catch (error) {
        console.error("Delete choir error:", error);
        return c.json({ error: "Failed to delete choir" }, 500);
      }
    }
  )

  // POST /api/choirs/:id/members - Add member to choir
  .post(
    "/:id/members",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", ChoirMemberSchema),
    requirePermission("write:choirs"),
    async (c) => {
      try {
        const { id: choirId } = c.req.valid("param");
        const { memberId, voice, status } = c.req.valid("json");
        const orgContext = getOrganizationContext(c);

        // Check if member is already in choir
        const existingMembership = await prisma.choirMember.findUnique({
          where: {
            choirId_memberId_orgId: {
              choirId,
              memberId,
              orgId: orgContext.organizationId
            }
          }
        });

        if (existingMembership && existingMembership.status === "ACTIVE") {
          return c.json({ error: "Member already in choir", code: "MEMBER_ALREADY_IN_CHOIR" }, 409);
        }

        // If member was previously in choir but left, reactivate
        if (existingMembership) {
          const reactivatedMember = await prisma.choirMember.update({
            where: { id: existingMembership.id },
            data: {
              status: status || "ACTIVE",
              voice,
              leftAt: null,
              joinedAt: new Date()
            },
            include: {
              member: {
                select: { id: true, name: true, image: true }
              }
            }
          });

          return c.json(reactivatedMember, 201);
        }

        // Create new choir membership
        const choirMember = await prisma.choirMember.create({
          data: {
            choirId,
            memberId,
            voice,
            status: status || "ACTIVE",
            orgId: orgContext.organizationId,
          },
          include: {
            member: {
              select: { id: true, name: true, image: true }
            }
          }
        });

        return c.json(choirMember, 201);

      } catch (error) {
        console.error("Add choir member error:", error);
        return c.json({ error: "Failed to add member to choir" }, 500);
      }
    }
  )

  // PATCH /api/choirs/:id/members/:memberId - Update choir member
  .patch(
    "/:id/members/:memberId",
    zValidator("param", z.object({ 
      id: z.string(),
      memberId: z.string() 
    })),
    zValidator("json", ChoirMemberSchema.partial()),
    requirePermission("write:choirs"),
    async (c) => {
      try {
        const { id: choirId, memberId } = c.req.valid("param");
        const updateData = c.req.valid("json");
        const orgContext = getOrganizationContext(c);

        const choirMember = await prisma.choirMember.findUnique({
          where: {
            choirId_memberId_orgId: {
              choirId,
              memberId,
              orgId: orgContext.organizationId
            }
          }
        });

        if (!choirMember) {
          return c.json({ error: "Choir member not found", code: "CHOIR_MEMBER_NOT_FOUND" }, 404);
        }

        const updatedMember = await prisma.choirMember.update({
          where: { id: choirMember.id },
          data: {
            ...updateData,
            leftAt: updateData.status === "INACTIVE" ? new Date() : null
          },
          include: {
            member: {
              select: { id: true, name: true, image: true }
            }
          }
        });

        return c.json(updatedMember);

      } catch (error) {
        console.error("Update choir member error:", error);
        return c.json({ error: "Failed to update choir member" }, 500);
      }
    }
  )

  // DELETE /api/choirs/:id/members/:memberId - Remove member from choir
  .delete(
    "/:id/members/:memberId",
    zValidator("param", z.object({ 
      id: z.string(),
      memberId: z.string() 
    })),
    requirePermission("write:choirs"),
    async (c) => {
      try {
        const { id: choirId, memberId } = c.req.valid("param");
        const orgContext = getOrganizationContext(c);

        const choirMember = await prisma.choirMember.updateMany({
          where: {
            choirId,
            memberId,
            orgId: orgContext.organizationId,
            status: "ACTIVE"
          },
          data: {
            status: "INACTIVE",
            leftAt: new Date()
          }
        });

        if (choirMember.count === 0) {
          return c.json({ error: "Active choir member not found", code: "CHOIR_MEMBER_NOT_FOUND" }, 404);
        }

        return c.json({ message: "Member removed from choir successfully" });

      } catch (error) {
        console.error("Remove choir member error:", error);
        return c.json({ error: "Failed to remove member from choir" }, 500);
      }
    }
  );

export default choirs;
