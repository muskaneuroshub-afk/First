import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { buildTestApp, prismaTest } from './helpers/testApp';

const VALID_TOKEN = 'this-is-a-valid-admin-token-that-is-at-least-32-chars-long';

let seededIds: string[] = [];

beforeAll(async () => {
  // Clear and seed known messages
  await prismaTest.contactMessage.deleteMany({});
  await prismaTest.contactMessage.createMany({
    data: [
      {
        fullName: 'Admin Test Alpha',
        email: 'alpha@example.com',
        subject: 'Alpha Subject',
        message: 'Alpha message body for admin tests.',
        status: 'new',
        emailNotifyStatus: 'disabled',
        ipHash: 'hash-alpha',
      },
      {
        fullName: 'Admin Test Beta',
        email: 'beta@example.com',
        subject: 'Beta Subject',
        message: 'Beta message body for admin tests.',
        status: 'read',
        emailNotifyStatus: 'disabled',
        ipHash: 'hash-beta',
      },
      {
        fullName: 'Sample Search Target',
        email: 'sample@example.com',
        subject: 'Sample Subject',
        message: 'Sample message body for search tests.',
        status: 'new',
        emailNotifyStatus: 'disabled',
        ipHash: 'hash-sample',
      },
    ],
  });
  const all = await prismaTest.contactMessage.findMany({ orderBy: { createdAt: 'asc' } });
  seededIds = all.map((m) => m.id);
});

afterAll(async () => {
  await prismaTest.$disconnect();
});

describe('Admin API — disabled (no token)', () => {
  beforeEach(() => {
    process.env['ADMIN_API_TOKEN'] = '';
  });

  it('GET /api/admin/messages returns 404 when ADMIN_API_TOKEN not set', async () => {
    const app = buildTestApp();
    const res = await request(app)
      .get('/api/admin/messages')
      .set('Authorization', `Bearer ${VALID_TOKEN}`);
    expect(res.status).toBe(404);
  });
});

describe('Admin API — active', () => {
  let app: ReturnType<typeof buildTestApp>;

  beforeEach(() => {
    process.env['ADMIN_API_TOKEN'] = VALID_TOKEN;
    app = buildTestApp();
  });

  describe('Authentication', () => {
    it('returns 401 with WWW-Authenticate header when no Authorization header', async () => {
      const res = await request(app).get('/api/admin/messages');
      expect(res.status).toBe(401);
      expect(res.headers['www-authenticate']).toMatch(/Bearer/i);
    });

    it('returns 401 when Authorization header is malformed', async () => {
      const res = await request(app)
        .get('/api/admin/messages')
        .set('Authorization', 'Basic dXNlcjpwYXNz');
      expect(res.status).toBe(401);
    });

    it('returns 403 with wrong token', async () => {
      const res = await request(app)
        .get('/api/admin/messages')
        .set('Authorization', 'Bearer wrong-token-that-is-also-very-long-and-wrong');
      expect(res.status).toBe(403);
    });
  });

  describe('List messages', () => {
    it('returns 200 with paginated list (newest first)', async () => {
      const res = await request(app)
        .get('/api/admin/messages')
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(3);
      expect(res.body.pagination.total).toBe(3);
      // Newest first
      const dates = res.body.data.map((m: { createdAt: string }) => new Date(m.createdAt).getTime());
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
      }
    });

    it('ipHash never appears in admin list response', async () => {
      const res = await request(app)
        .get('/api/admin/messages')
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      for (const msg of res.body.data) {
        expect(msg).not.toHaveProperty('ipHash');
      }
    });

    it('filters by ?status=new', async () => {
      const res = await request(app)
        .get('/api/admin/messages?status=new')
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(200);
      expect(res.body.data.every((m: { status: string }) => m.status === 'new')).toBe(true);
    });

    it('search by ?search=Sample matches fullName/email/subject', async () => {
      const res = await request(app)
        .get('/api/admin/messages?search=Sample')
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      const names = res.body.data.map((m: { fullName: string }) => m.fullName);
      expect(names.some((n: string) => n.includes('Sample'))).toBe(true);
    });

    it('pagination: ?page=2&limit=1 returns correct page', async () => {
      const res = await request(app)
        .get('/api/admin/messages?page=2&limit=1')
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.pagination.page).toBe(2);
      expect(res.body.pagination.limit).toBe(1);
      expect(res.body.pagination.total).toBe(3);
      expect(res.body.pagination.totalPages).toBe(3);
    });
  });

  describe('Single message', () => {
    it('GET /api/admin/messages/:id returns 200 with full message', async () => {
      const id = seededIds[0];
      const res = await request(app)
        .get(`/api/admin/messages/${id}`)
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(id);
      expect(res.body.data).not.toHaveProperty('ipHash');
    });

    it('GET /api/admin/messages/:id returns 404 for nonexistent id', async () => {
      const res = await request(app)
        .get('/api/admin/messages/nonexistent-id-000')
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(404);
    });
  });

  describe('Update status', () => {
    it('PATCH /api/admin/messages/:id updates status to "read"', async () => {
      const id = seededIds[0];
      const res = await request(app)
        .patch(`/api/admin/messages/${id}`)
        .set('Authorization', `Bearer ${VALID_TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({ status: 'read' });
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('read');
      expect(res.body.data).not.toHaveProperty('ipHash');
    });

    it('PATCH with invalid status returns 400', async () => {
      const id = seededIds[0];
      const res = await request(app)
        .patch(`/api/admin/messages/${id}`)
        .set('Authorization', `Bearer ${VALID_TOKEN}`)
        .set('Content-Type', 'application/json')
        .send({ status: 'INVALID_STATUS' });
      expect(res.status).toBe(400);
    });
  });

  describe('Delete message', () => {
    it('DELETE /api/admin/messages/:id returns 204', async () => {
      const id = seededIds[seededIds.length - 1];
      const res = await request(app)
        .delete(`/api/admin/messages/${id}`)
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(204);
    });

    it('GET deleted message returns 404', async () => {
      const id = seededIds[seededIds.length - 1];
      const res = await request(app)
        .get(`/api/admin/messages/${id}`)
        .set('Authorization', `Bearer ${VALID_TOKEN}`);
      expect(res.status).toBe(404);
    });
  });
});
