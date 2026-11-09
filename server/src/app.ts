import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { env, getCorsOrigins } from './config/env';
import logger from './lib/logger';
import { requestId } from './middleware/requestId';
import { globalLimiter } from './middleware/rateLimiters';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import healthRouter from './routes/health';
import contactRouter from './routes/contact';
import adminRouter from './routes/admin';

export function buildApp() {
  const app = express();

  // Trust reverse proxy if configured
  if (env.TRUST_PROXY) {
    app.set('trust proxy', 1);
  }

  // Security headers
  app.use(helmet());

  // CORS — strict allowlist, no wildcards
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman) only in dev/test
        if (!origin) {
          if (env.NODE_ENV !== 'production') return callback(null, true);
          return callback(null, false);
        }
        const allowedOrigins = getCorsOrigins();
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  );

  // Request ID (before logger so it appears in log lines)
  app.use(requestId);

  // HTTP request logging (no bodies)
  app.use(
    pinoHttp({
      logger,
      customProps: (_req, res) => ({ requestId: res.locals['requestId'] }),
    }),
  );

  // Parse JSON bodies — 10 KB limit on all routes
  app.use(express.json({ limit: '10kb' }));

  // Global rate limit
  app.use('/api', globalLimiter);

  // Routes
  app.use('/api/health', healthRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/admin', adminRouter);

  // 404 for unknown routes
  app.use(notFound);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
