import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Factory middleware that validates req.body against a Zod schema.
 * Strips unknown fields, returns 400 with per-field errors on failure.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check the highlighted fields.',
        errors,
      });
    }
    req.body = result.data;
    next();
  };
}

