import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://dummy",
    directUrl: process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://dummy",
  } as any,
});

