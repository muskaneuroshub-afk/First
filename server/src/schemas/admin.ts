import { z } from 'zod';

export const MessageStatus = z.enum(['new', 'read', 'replied', 'archived']);
export type MessageStatusType = z.infer<typeof MessageStatus>;

export const AdminQuerySchema = z.object({
  status: MessageStatus.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(100).optional(),
});

export const AdminPatchSchema = z.object({
  status: MessageStatus,
});

