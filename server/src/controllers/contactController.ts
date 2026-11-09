import { Request, Response, NextFunction } from 'express';
import { createMessage } from '../services/contactService';
import { notifyAsync } from '../services/notificationService';
import logger from '../lib/logger';

export async function submitContact(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // req.body is already validated and sanitized by the validate() middleware.
    const { fullName, email, subject, message, honeypot } = req.body as {
      fullName: string;
      email: string;
      subject: string;
      message: string;
      honeypot?: string;
    };

    // Honeypot: if filled, silently succeed — don't store, don't email
    if (honeypot && honeypot.trim().length > 0) {
      logger.warn(
        { requestId: res.locals['requestId'] },
        'Honeypot field filled — suspected bot submission discarded',
      );
      return res.status(201).json({
        success: true,
        message:
          "Thank you! Your message has been received. I'll get back to you soon.",
      });
    }

    // Derive client IP (trust proxy setting is handled in app.ts)
    const rawIp =
      (req.ip ?? req.socket?.remoteAddress ?? '0.0.0.0');
    const userAgent = req.headers['user-agent'];

    // Persist message
    const record = await createMessage(
      { fullName, email, subject, message, honeypot },
      rawIp,
      userAgent,
    );

    // Fire notification asynchronously — never await in response path
    void notifyAsync(record);

    return res.status(201).json({
      success: true,
      message:
        "Thank you! Your message has been received. I'll get back to you as soon as possible.",
      id: record.id,
    });
  } catch (err) {
    next(err);
  }
}

