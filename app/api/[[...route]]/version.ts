import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/lib/db/client";
import { handleError } from "@/lib/error-handler";
import { requirePermission } from "@/lib/security/tenant";

// Validation schemas
const createVersionSchema = z.object({
  version: z.string().min(1, "Version is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  status: z.enum(["DEVELOPMENT", "TESTING", "STAGING", "PRODUCTION", "DEPRECATED"]).default("DEVELOPMENT"),
  releaseDate: z.date({
    required_error: "Release date is required",
    invalid_type_error: "Release date must be a valid date",
  }),
  createdBy: z.string().min(1, "Created by is required"),
});

const updateVersionSchema = createVersionSchema.partial();

const querySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('20'),
  status: z.enum(["DEVELOPMENT", "TESTING", "STAGING", "PRODUCTION", "DEPRECATED"]).optional(),
  search: z.string().optional(),
});

const app = new Hono()
  // GET /version - List versions with pagination and filtering
  .get(
    "/",
    zValidator("query", querySchema),
    requirePermission("read:versions"),
    async (c) => {
      try {
        const { page, limit, status, search } = c.req.valid("query");
        const skip = (page - 1) * limit;

        // Build where clause
        const where: Record<string, unknown> = {};

        if (status) where.status = status;
        
        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { version: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
        }

        const [versions, total] = await Promise.all([
          prisma.versionInfo.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
          }),
          prisma.versionInfo.count({ where }),
        ]);

        return c.json({
          versions,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        return handleError(c, error, 500, 'VERSIONS_FETCH_ERROR');
      }
    }
  )

  // POST /version - Create new version
  .post(
    "/", 
    zValidator("json", createVersionSchema),
    requirePermission("create:versions"),
    async (c) => {
      try {
        const values = c.req.valid("json");

        // Check for duplicate version
        const existingVersion = await prisma.versionInfo.findFirst({
          where: { version: values.version },
        });

        if (existingVersion) {
          return c.json({ error: 'Version already exists' }, 409);
        }

        const data = await prisma.versionInfo.create({
          data: {...values},
        });

        return c.json(data, 201);
      } catch (error) {
        return handleError(c, error, 500, 'VERSION_CREATION_ERROR');
      }
    }
  )

  // GET /version/:id - Get specific version
  .get(
    "/:id", 
    requirePermission("read:versions"),
    async (c) => {
      try {
        const id = c.req.param("id");

        const version = await prisma.versionInfo.findUnique({
          where: { id },
        });

        if (!version) {
          return c.json({ error: "Version not found" }, 404);
        }

        return c.json(version);
      } catch (error) {
        return handleError(c, error, 500, 'VERSION_FETCH_ERROR');
      }
    }
  )

  // PATCH /version/:id - Update version
  .patch(
    "/:id",
    zValidator("json", updateVersionSchema),
    requirePermission("update:versions"),
    async (c) => {
      try {
        const id = c.req.param("id");
        const values = c.req.valid("json");

        // Check if version exists
        const existingVersion = await prisma.versionInfo.findUnique({
          where: { id },
        });

        if (!existingVersion) {
          return c.json({ error: "Version not found" }, 404);
        }

        // Check for duplicate version if updating version field
        if (values.version && values.version !== existingVersion.version) {
          const duplicateVersion = await prisma.versionInfo.findFirst({
            where: { 
              version: values.version,
              id: { not: id }
            },
          });

          if (duplicateVersion) {
            return c.json({ error: 'Version already exists' }, 409);
          }
        }

        const data = await prisma.versionInfo.update({
          where: { id },
          data: values,
        });

        return c.json(data);
      } catch (error) {
        return handleError(c, error, 500, 'VERSION_UPDATE_ERROR');
      }
    }
  )

  // DELETE /version/:id - Delete version
  .delete(
    "/:id",
    requirePermission("delete:versions"),
    async (c) => {
      try {
        const id = c.req.param("id");

        const version = await prisma.versionInfo.findUnique({
          where: { id },
        });

        if (!version) {
          return c.json({ error: "Version not found" }, 404);
        }

        await prisma.versionInfo.delete({ where: { id } });
        return c.json({ message: "Version deleted successfully" });
      } catch (error) {
        return handleError(c, error, 500, 'VERSION_DELETION_ERROR');
      }
    }
  );

export default app;
