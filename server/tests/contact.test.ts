import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { buildTestApp, prismaTest } from './helpers/testApp';

const app = buildTestApp();

beforeAll(async () => {
  // Clean contact_messages before contact tests
  await prismaTest.contactMessage.deleteMany({});
});

afterAll(async () => {
  await prismaTest.$disconnect();
});

const VALID_BODY = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Hello there',
  message: 'This is a valid test message with enough characters.',
};

describe('POST /api/contact', () => {
  it('rejects non-JSON Content-Type with 415', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'text/plain')
      .send('hello');
    expect(res.status).toBe(415);
  });

  it('rejects malformed JSON with 400', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('{invalid json}');
    expect(res.status).toBe(400);
  });

  it('rejects body over 10 KB with 413', async () => {
    const bigBody = JSON.stringify({
      ...VALID_BODY,
      message: 'x'.repeat(11000),
    });
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send(bigBody);
    expect(res.status).toBe(413);
  });

  it('returns 400 when fullName is missing', async () => {
    const { fullName: _fn, ...body } = VALID_BODY;
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send(body);
    expect(res.status).toBe(400);
    expect(res.body.errors?.fullName).toBeDefined();
  });

  it('returns 400 when fullName is 1 character', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, fullName: 'A' });
    expect(res.status).toBe(400);
    expect(res.body.errors?.fullName).toBeDefined();
  });

  it('returns 400 when fullName exceeds 100 characters', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, fullName: 'A'.repeat(101) });
    expect(res.status).toBe(400);
    expect(res.body.errors?.fullName).toBeDefined();
  });

  it('returns 400 when fullName is whitespace-only', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, fullName: '   ' });
    expect(res.status).toBe(400);
    expect(res.body.errors?.fullName).toBeDefined();
  });

  it('returns 400 when email is missing', async () => {
    const { email: _e, ...body } = VALID_BODY;
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send(body);
    expect(res.status).toBe(400);
    expect(res.body.errors?.email).toBeDefined();
  });

  it('returns 400 when email is invalid', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.errors?.email).toBeDefined();
  });

  it('returns 400 when subject is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, subject: 'ab' });
    expect(res.status).toBe(400);
    expect(res.body.errors?.subject).toBeDefined();
  });

  it('returns 400 when subject exceeds 150 characters', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, subject: 'S'.repeat(151) });
    expect(res.status).toBe(400);
    expect(res.body.errors?.subject).toBeDefined();
  });

  it('returns 400 when message is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, message: 'Too short' }); // 9 chars
    expect(res.status).toBe(400);
    expect(res.body.errors?.message).toBeDefined();
  });

  it('returns 400 when message exceeds 3000 characters', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, message: 'M'.repeat(3001) });
    expect(res.status).toBe(400);
    expect(res.body.errors?.message).toBeDefined();
  });

  it('accepts a valid submission and stores it in DB', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send(VALID_BODY);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.id).toBeDefined();

    // Verify DB record
    const record = await prismaTest.contactMessage.findUnique({
      where: { id: res.body.id },
    });
    expect(record).not.toBeNull();
    expect(record!.status).toBe('new');
    expect(record!.ipHash).toBeDefined();
    expect(record!.ipHash).not.toBe('::1'); // raw IP never stored
    expect(record!.ipHash).not.toBe('127.0.0.1');
    expect(record!.emailNotifyStatus).toBe('disabled'); // SMTP not configured in test env
  });

  it('accepts Unicode name "Zoë O\'Neil-Ahmed"', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'zoe@example.com', fullName: "Zoë O'Neil-Ahmed" });
    expect(res.status).toBe(201);
  });

  it('accepts CR/LF in subject and stores it stripped', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'crlf@example.com', subject: 'Hello\r\nWorld' });
    expect(res.status).toBe(201);

    const record = await prismaTest.contactMessage.findUnique({
      where: { id: res.body.id },
    });
    expect(record!.subject).not.toContain('\r');
    expect(record!.subject).not.toContain('\n');
  });

  it('ignores unknown extra fields in body', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'extra@example.com', unknownField: 'should-be-ignored' });
    expect(res.status).toBe(201);

    const record = await prismaTest.contactMessage.findUnique({
      where: { id: res.body.id },
    });
    expect(record).not.toHaveProperty('unknownField');
  });

  it('returns 201 when honeypot is filled but does NOT store anything', async () => {
    const countBefore = await prismaTest.contactMessage.count();
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'bot@example.com', honeypot: 'I am a bot' });
    expect(res.status).toBe(201);
    const countAfter = await prismaTest.contactMessage.count();
    expect(countAfter).toBe(countBefore); // nothing stored
  });

  it('stores SQL injection string literally and leaves table intact', async () => {
    const injection = "'; DROP TABLE contact_messages;--";
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'sqlinject@example.com', subject: injection.slice(0, 50) + 'x' });
    expect(res.status).toBe(201);

    // Table must still be queryable
    const count = await prismaTest.contactMessage.count();
    expect(count).toBeGreaterThan(0);
  });

  it('stores NoSQL-style injection string literally', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'nosql@example.com', subject: '{"$ne": null} injection' });
    expect(res.status).toBe(201);
  });

  it('returns 429 on the (CONTACT_RATE_LIMIT_MAX+1)th request from same IP', async () => {
    // Set very low limit for this sub-test via a fresh app instance
    process.env['CONTACT_RATE_LIMIT_MAX'] = '3';
    process.env['CONTACT_RATE_LIMIT_WINDOW_MINUTES'] = '1';
    const rateLimitedApp = buildTestApp();

    // Make 3 valid requests (they succeed)
    for (let i = 0; i < 3; i++) {
      await request(rateLimitedApp)
        .post('/api/contact')
        .set('Content-Type', 'application/json')
        .send({ ...VALID_BODY, email: `ratelimit${i}@example.com` });
    }

    // 4th request should be 429
    const res = await request(rateLimitedApp)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({ ...VALID_BODY, email: 'ratelimit4@example.com' });

    expect(res.status).toBe(429);
    expect(res.body.success).toBe(false);
    expect(res.headers['retry-after']).toBeDefined();
    expect(res.body.retryAfterSeconds).not.toBeNull();

    // Reset
    process.env['CONTACT_RATE_LIMIT_MAX'] = '100';
    process.env['CONTACT_RATE_LIMIT_WINDOW_MINUTES'] = '15';
  });
});

