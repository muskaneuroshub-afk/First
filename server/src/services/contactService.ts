import { prisma } from '../lib/prisma';
import { hashIp } from '../lib/hash';
import type { ContactSchemaOutput } from '../schemas/contact';

export async function createMessage(
  body: ContactSchemaOutput,
  rawIp: string,
  userAgent?: string,
) {
  const ipHash = hashIp(rawIp);
  // Truncate userAgent to 255 chars for storage
  const ua = userAgent ? userAgent.slice(0, 255) : null;

  const record = await prisma.contactMessage.create({
    data: {
      fullName: body.fullName,
      email: body.email,
      subject: body.subject,
      message: body.message,
      ipHash,
      userAgent: ua ?? undefined,
    },
  });

  return record;
}

export async function updateEmailStatus(
  id: string,
  status: 'sent' | 'failed' | 'disabled',
) {
  await prisma.contactMessage.update({
    where: { id },
    data: { emailNotifyStatus: status },
  });
}

