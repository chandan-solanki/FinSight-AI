import { PrismaClient } from "@prisma/client";

/**
 * Global Prisma client instance to prevent multiple connections in development.
 * In production, creates a new client. In development, reuses the global instance
 * to avoid "too many clients" errors during hot reloads.
 */
export const db = globalThis.prisma || new PrismaClient();

// Store the client globally in development to prevent multiple instances
// during Next.js hot reloads and file changes
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}


