import { Request, Response, NextFunction } from 'express';
import { createHash, timingSafeEqual } from 'crypto';
import { getAdminToken, isAdminEnabled } from '../config/env';

function hashToken(token: string): Buffer {
  return Buffer.from(createHash('sha256').update(token).digest('hex'), 'utf8');
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  // If admin is not enabled, return 404 — don't reveal endpoint existence
  if (!isAdminEnabled()) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  const authHeader = req.headers.authorization ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    res.setHeader('WWW-Authenticate', 'Bearer realm="admin"');
    return res
      .status(401)
      .json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.slice(7);
  const expected = getAdminToken()!;

  // Constant-time comparison using SHA-256 hashes of equal length
  const tokenHash = hashToken(token);
  const expectedHash = hashToken(expected);

  if (!timingSafeEqual(tokenHash, expectedHash)) {
    return res
      .status(403)
      .json({ success: false, message: 'Invalid authentication token' });
  }

  next();
}
