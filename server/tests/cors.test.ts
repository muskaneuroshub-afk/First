import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildTestApp } from './helpers/testApp';

// Build app with specific CORS origins
const app = buildTestApp({
  CORS_ORIGINS: 'http://localhost:3000,http://allowed.example.com',
});

describe('CORS headers', () => {
  it('allowed origin receives Access-Control-Allow-Origin header', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'http://localhost:3000');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });

  it('disallowed origin does NOT receive Access-Control-Allow-Origin header', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'http://evil.attacker.com');
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('another allowed origin also receives the header', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'http://allowed.example.com');
    expect(res.headers['access-control-allow-origin']).toBe('http://allowed.example.com');
  });
});

