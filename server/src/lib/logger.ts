import pino from 'pino';
import { env } from '../config/env';

const logger = pino(
  {
    level: env.NODE_ENV === 'test' ? 'silent' : 'info',
    // Never log request/response bodies
    redact: {
      paths: [
        'req.body',
        'res.body',
        'req.headers.authorization',
        'req.headers.cookie',
      ],
      censor: '[REDACTED]',
    },
  },
  env.NODE_ENV !== 'production'
    ? pino.transport({
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' },
      })
    : undefined,
);

export default logger;

