import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

/** 100 requests per 15 minutes on all /api routes */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

/** Configurable limit for contact form submissions */
export const contactLimiter = rateLimit({
  windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: () => Number(process.env['CONTACT_RATE_LIMIT_MAX'] || env.CONTACT_RATE_LIMIT_MAX),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    const retryAfter = res.getHeader('Retry-After');
    const retryAfterSeconds =
      typeof retryAfter === 'string' ? parseInt(retryAfter, 10) : undefined;
    res.status(429).json({
      success: false,
      message:
        'You have sent too many messages. Please wait a few minutes before trying again.',
      retryAfterSeconds: retryAfterSeconds ?? null,
    });
  },
});

/** 30 requests per 15 minutes on admin routes */
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many admin requests. Please slow down.',
  },
});

/** Lockout after 10 failed auth attempts per hour */
export const adminAuthLockout = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message:
      'Too many failed authentication attempts. Access locked for 1 hour.',
  },
});
