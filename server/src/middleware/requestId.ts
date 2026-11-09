import { Request, Response, NextFunction } from 'express';

export function requestId(_req: Request, res: Response, next: NextFunction) {
  const id = crypto.randomUUID();
  res.setHeader('X-Request-Id', id);
  res.locals['requestId'] = id;
  next();
}

