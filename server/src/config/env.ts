import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  IP_HASH_SALT: z
    .string()
    .min(16, 'IP_HASH_SALT must be at least 16 characters'),
  CORS_ORIGINS: z.string().min(1, 'CORS_ORIGINS is required'),
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(5),
  CONTACT_RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().int().min(1).default(15),
  ADMIN_API_TOKEN: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 32,
      'ADMIN_API_TOKEN must be at least 32 characters when set',
    ),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).optional(),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((v) => v === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CONTACT_NOTIFY_TO: z.string().email().optional().or(z.literal('')),
  MAIL_FROM: z.string().optional(),
  TRUST_PROXY: z
    .string()
    .optional()
    .transform((v) => v === 'true'),
});

function loadEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const messages = result.error.errors
      .map((e) => `  ${e.path.join('.')}: ${e.message}`)
      .join('\n');
    throw new Error(
      `\n[Config] Invalid environment variables:\n${messages}\n\nCopy server/.env.example to server/.env and fill in the required values.\n`,
    );
  }
  return result.data;
}

export const env = loadEnv();

export function getAdminToken(): string | undefined {
  return process.env['ADMIN_API_TOKEN'] !== undefined
    ? process.env['ADMIN_API_TOKEN']
    : env.ADMIN_API_TOKEN;
}

export function isAdminEnabled(): boolean {
  const token = getAdminToken();
  return Boolean(token && token.length >= 32);
}

export function getCorsOrigins(): string[] {
  const raw = process.env['CORS_ORIGINS'] || env.CORS_ORIGINS;
  return raw.split(',').map((o) => o.trim());
}

export function isEmailEnabled(): boolean {
  return !!(
    env.SMTP_HOST &&
    env.SMTP_PORT &&
    env.SMTP_USER &&
    env.SMTP_PASS &&
    env.CONTACT_NOTIFY_TO &&
    env.MAIL_FROM
  );
}
