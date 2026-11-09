import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { isAdminEnabled } from '../config/env';
import { AdminQuerySchema, AdminPatchSchema } from '../schemas/admin';

// Fields we never expose to admin responses
const SAFE_SELECT = {
  id: true,
  fullName: true,
  email: true,
  subject: true,
  message: true,
  status: true,
  emailNotifyStatus: true,
  userAgent: true,
  createdAt: true,
  updatedAt: true,
  // ipHash: intentionally omitted
} as const;

function guardAdmin(res: Response): boolean {
  if (!isAdminEnabled()) {
    res.status(404).json({ success: false, message: 'Not found' });
    return false;
  }
  return true;
}

export async function listMessages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!guardAdmin(res)) return;
  try {
    const query = AdminQuerySchema.parse(req.query);
    const { status, page, limit, search } = query;

    const where = {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { fullName: { contains: search } },
              { email: { contains: search } },
              { subject: { contains: search } },
            ],
          }
        : {}),
    };

    const [total, messages] = await prisma.$transaction([
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.findMany({
        where,
        select: SAFE_SELECT,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!guardAdmin(res)) return;
  try {
    const { id } = req.params;
    const message = await prisma.contactMessage.findUnique({
      where: { id },
      select: SAFE_SELECT,
    });
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    return res.status(200).json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
}

export async function updateMessageStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!guardAdmin(res)) return;
  try {
    const { id } = req.params;

    // Validate patch body
    const parsed = AdminPatchSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status: parsed.data.status },
      select: SAFE_SELECT,
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!guardAdmin(res)) return;
  try {
    const { id } = req.params;
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await prisma.contactMessage.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

