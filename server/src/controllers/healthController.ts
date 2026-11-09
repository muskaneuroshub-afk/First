import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function healthCheck(_req: Request, res: Response) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const uptimeSeconds = Math.floor(process.uptime());
    res.status(200).json({
      status: 'ok',
      uptimeSeconds,
      database: 'up',
    });
  } catch {
    res.status(503).json({
      status: 'degraded',
      database: 'down',
    });
  }
}

