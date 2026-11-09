import { sendNotification } from '../lib/mailer';
import { updateEmailStatus } from './contactService';
import logger from '../lib/logger';
import type { ContactMessage } from '@prisma/client';

/**
 * Fires email notification asynchronously and updates the DB status.
 * Never throws — email failure must not fail the HTTP response.
 */
export async function notifyAsync(msg: ContactMessage): Promise<void> {
  try {
    const status = await sendNotification(msg);
    await updateEmailStatus(msg.id, status);
    if (status === 'sent') {
      logger.info({ msgId: msg.id }, 'Email notification sent');
    } else if (status === 'failed') {
      logger.warn({ msgId: msg.id }, 'Email notification failed — stored in DB');
    }
  } catch (err) {
    logger.error({ err, msgId: msg.id }, 'Unexpected error in notifyAsync');
  }
}

