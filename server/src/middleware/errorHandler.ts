import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const requestId = res.locals['requestId'] ?? 'unknown';

  // Handle body-parser errors (bad JSON, body too large)
  if (err && typeof err === 'object') {
    const errorObj = err as Record<string, unknown>;
    if (
      errorObj['type'] === 'entity.parse.failed' ||
      (err instanceof SyntaxError && 'status' in err && errorObj['status'] === 400)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Malformed JSON payload',
        requestId,
      });
    }
    if (errorObj['type'] === 'entity.too.large' || errorObj['status'] === 413) {
      return res.status(413).json({
        success: false,
        message: 'Payload too large. Maximum size is 10 KB.',
        requestId,
      });
    }
  }

  // Log with request ID but never log body or sensitive data
  logger.error({ err, requestId }, 'Unhandled error');

  // Never expose stack traces, SQL, file paths, or internal details
  res.status(500).json({
    success: false,
    message:
      'Something went wrong on our side. Please try again later.',
    requestId,
  });
}
