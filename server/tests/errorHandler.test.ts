import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { buildTestApp } from './helpers/testApp';
import { errorHandler } from '../src/middleware/errorHandler';
import { requestId } from '../src/middleware/requestId';

// Build a minimal test app that deliberately throws a 500
function buildErrorTestApp() {
  const app = express();
  app.use(requestId);
  app.get('/test-error', (_req, _res, next) => {
    next(new Error('Deliberate test error'));
  });
  app.use(errorHandler);
  return app;
}

describe('Error handler middleware', () => {
  it('returns 500 JSON with no stack trace or internal details', async () => {
    const testApp = buildErrorTestApp();
    const res = await request(testApp).get('/test-error');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(typeof res.body.message).toBe('string');
    expect(res.body.message).not.toContain('Error');
    expect(res.body.message).not.toContain('at '); // no stack trace
    expect(res.body).not.toHaveProperty('stack');
    expect(res.body.requestId).toBeDefined();
  });
});

describe('404 handler', () => {
  it('returns 404 JSON for unknown route', async () => {
    const app = buildTestApp();
    const res = await request(app).get('/api/this-route-does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

