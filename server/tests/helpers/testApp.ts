import { PrismaClient } from '@prisma/client';
import { buildApp } from '../../src/app';

export function buildTestApp(overrideEnv?: Record<string, string>) {
  if (overrideEnv) {
    Object.assign(process.env, overrideEnv);
  }
  return buildApp();
}

// Shared Prisma client for test assertions
export const prismaTest = new PrismaClient({
  datasources: { db: { url: process.env['DATABASE_URL'] ?? 'file:./prisma/test.db' } },
});

