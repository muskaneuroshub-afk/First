import { beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

// Set test environment variables BEFORE any module loads env.ts
process.env['NODE_ENV'] = 'test';
process.env['DATABASE_URL'] = 'file:./prisma/test.db';
process.env['PORT'] = '4001';
process.env['IP_HASH_SALT'] = 'test-salt-for-unit-tests-only-not-for-production';
process.env['CORS_ORIGINS'] = 'http://localhost:3000';
process.env['CONTACT_RATE_LIMIT_MAX'] = '100'; // high limit so tests don't self-429
process.env['CONTACT_RATE_LIMIT_WINDOW_MINUTES'] = '15';
process.env['ADMIN_API_TOKEN'] = ''; // disabled by default; individual tests set it
process.env['TRUST_PROXY'] = 'false';

beforeAll(async () => {
  // Run migrations against test.db
  execSync('npx prisma migrate deploy', {
    cwd: path.resolve(__dirname, '../..'),
    env: { ...process.env },
    stdio: 'pipe',
  });
});

afterAll(async () => {
  // prismaTest disconnects in testApp.ts
});

