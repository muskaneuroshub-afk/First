import { z } from 'zod';

// Strip carriage-return and line-feed characters (header injection prevention)
function stripCRLF(s: string): string {
  return s.replace(/[\r\n]+/g, ' ');
}

// Reject control chars except \n (0x0A) and \t (0x09)
function noControlChars(s: string): boolean {
  // eslint-disable-next-line no-control-regex
  return !/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(s);
}

export const contactSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be at most 100 characters')
    // Strip CR/LF from name
    .transform(stripCRLF)
    // Reject remaining control chars
    .refine(noControlChars, 'Full name contains invalid characters'),

  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .transform((s) => s.toLowerCase())
    .transform(stripCRLF),

  subject: z
    .string({ required_error: 'Subject is required' })
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject must be at most 150 characters')
    .transform(stripCRLF)
    .refine(noControlChars, 'Subject contains invalid characters'),

  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message must be at most 3000 characters')
    .refine(
      noControlChars,
      'Message contains invalid control characters',
    ),

  honeypot: z.string().optional(),
});

export type ContactSchemaInput = z.input<typeof contactSchema>;
export type ContactSchemaOutput = z.output<typeof contactSchema>;

