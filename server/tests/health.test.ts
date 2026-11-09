import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildTestApp } from './helpers/testApp';

const app = buildTestApp();

describe('GET /api/health', () => {
  it('returns 200 with status ok and database up', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.database).toBe('up');
    expect(typeof res.body.uptimeSeconds).toBe('number');
  });
});

