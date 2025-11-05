import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/lib/db";
import { handleError } from "@/lib/error-handler";
import { requirePermission, requireRole } from "@/lib/security/tenant";

// Validation schemas
const createVersionSchema = z.object({
  version: z.string().min(1, "Version is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  status: z.enum(["DEVELOPMENT", "TESTING", "STAGING", "PRODUCTION", "DEPRECATED"]).default("DEVELOPMENT"),
  releaseDate: z.coerce.date({ message: "Release date is required" }),
  createdBy: z.string().min(1, "Created by is required"),
});

const updateVersionSchema = createVersionSchema.partial();

const querySchema = z.object({
  page: z.string().default('1').transform(Number),
  limit: z.string().default('20').transform(Number),
  status: z.enum(["DEVELOPMENT", "TESTING", "STAGING", "PRODUCTION", "DEPRECATED"]).optional(),
  search: z.string().optional(),
});

const app = new Hono()
  // GET /version - List versions with pagination and filtering
  .get(
    "/",
    zValidator("query", querySchema),
    // requirePermission("read:versions"),
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

        // TODO: Implement when versionInfo model is added to schema
        // Mock data for now
        const versions = [
          {
            id: "mock_version_1",
            version: "1.0.0",
            name: "Initial Release",
            description: "First version of the application",
            status: "PRODUCTION",
            releaseDate: new Date(),
            createdBy: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        const total = 1;

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
    // Only SUPERADMIN or DEVELOPMENT can create versions
    requireRole("DEVELOPMENT"),
    async (c) => {
      try {
        const values = c.req.valid("json");

        // TODO: Implement when versionInfo model is added to schema
        // Mock successful creation
        const data = {
          id: "temp_" + Date.now(),
          ...values,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        return c.json(data, 201);
      } catch (error) {
        return handleError(c, error, 500, 'VERSION_CREATION_ERROR');
      }
    }
  )

  // GET /version/:id - Get specific version
  .get(
    "/:id",
    async (c) => {
      try {
        const id = c.req.param("id");

        // TODO: Implement when versionInfo model is added to schema
        const version = {
          id,
          version: "1.0.0",
          name: "Mock Version",
          description: "Mock version description",
          status: "PRODUCTION",
          releaseDate: new Date(),
          createdBy: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        };

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
    // Only SUPERADMIN or DEVELOPMENT can update versions
    requireRole("DEVELOPMENT"),
    async (c) => {
      try {
        const id = c.req.param("id");
        const values = c.req.valid("json");

        // TODO: Implement when versionInfo model is added to schema
        // Mock successful update
        const data = {
          id,
          version: values.version || "1.0.0",
          name: values.name || "Updated Version",
          description: values.description || "Updated description",
          status: values.status || "PRODUCTION",
          releaseDate: values.releaseDate || new Date(),
          createdBy: values.createdBy || "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        };

        return c.json(data);
      } catch (error) {
        return handleError(c, error, 500, 'VERSION_UPDATE_ERROR');
      }
    }
  )

  // DELETE /version/:id - Delete version
  .delete(
    "/:id",
    // Only SUPERADMIN or DEVELOPMENT can delete versions
    requireRole("DEVELOPMENT"),
    async (c) => {
      try {
        const id = c.req.param("id");

        // TODO: Implement when versionInfo model is added to schema
        // Mock successful deletion
        return c.json({ message: "Version deleted successfully" });
      } catch (error) {
        return handleError(c, error, 500, 'VERSION_DELETION_ERROR');
      }
    }
  );

export default app;
