import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { generateApiKey } from "@/lib/generate-api-key/generate-api-key";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";
// the function above

const settings = new Hono()
    // Save or update user settings
    .post(
        "/", zValidator(
            "query",
            z.object({
                userId: z.string(), // The user ID to associate with the new organization
            })
        ),
        zValidator(
            "json",
            z.object({
                settings: z.any(), // ideally you can match your TextSettings schema
            })
        ),
        async (c) => {
            const { userId } = c.req.valid("query")
            const { settings } = c.req.valid("json");

            const existing = await featuresDBPrismaClient.userSettings.findFirst({
                where: { userId },
            });

            let result;
            if (existing) {
                result = await featuresDBPrismaClient.userSettings.update({
                    where: { id: existing.id },
                    data: { settings },
                });
            } else {
                result = await featuresDBPrismaClient.userSettings.create({
                    data: {
                        userId,
                        settings,
                        apiKey: generateApiKey(),
                    },
                });
            }

            return c.json({ message: "Settings saved", apiKey: result.apiKey });
        }
    )
    .get(
        "/:apiKey",
        async (c) => {
            const apiKey = c.req.param("apiKey");

            const data = await featuresDBPrismaClient.userSettings.findUnique({
                where: { apiKey },
            });

            if (!data) {
                return c.json({ error: "Invalid API key" }, 404);
            }

            return c.json({ settings: data.settings });
        }
    )

export default settings;