import nodemailer from 'nodemailer';
import { env, isEmailEnabled } from '../config/env';
import logger from './logger';
import type { ContactMessage } from '@prisma/client';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripCRLF(s: string): string {
  return s.replace(/[\r\n]+/g, ' ');
}

function buildTransporter() {
  if (!isEmailEnabled()) return null;
  return nodemailer.createTransport({
    host: env.SMTP_HOST!,
    port: env.SMTP_PORT!,
    secure: env.SMTP_SECURE,
    auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! },
  });
}

export async function sendNotification(
  msg: ContactMessage,
): Promise<'sent' | 'failed' | 'disabled'> {
  if (!isEmailEnabled()) return 'disabled';

  const transporter = buildTransporter();
  if (!transporter) return 'disabled';

  const safeSubject = stripCRLF(msg.subject);
  const safeName = stripCRLF(msg.fullName);
  const safeEmail = stripCRLF(msg.email);

  const text = [
    `New contact form submission from your portfolio website.`,
    ``,
    `From: ${safeName} <${safeEmail}>`,
    `Subject: ${safeSubject}`,
    `Received: ${msg.createdAt.toISOString()}`,
    `Message ID: ${msg.id}`,
    ``,
    `--- Message ---`,
    msg.message,
    `--- End ---`,
    ``,
    `Reply directly to: ${safeEmail}`,
  ].join('\n');

  const html = `
    <p>New contact form submission from your portfolio website.</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">From:</td><td>${escapeHtml(safeName)} &lt;${escapeHtml(safeEmail)}&gt;</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Subject:</td><td>${escapeHtml(safeSubject)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Message ID:</td><td>${escapeHtml(msg.id)}</td></tr>
    </table>
    <h3 style="font-family:sans-serif;font-size:14px;margin-top:16px">Message</h3>
    <pre style="background:#f5f5f5;padding:12px;border-radius:4px;font-size:13px;white-space:pre-wrap">${escapeHtml(msg.message)}</pre>
    <p style="font-family:sans-serif;font-size:13px;color:#666">
      Reply directly to: <a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a>
    </p>
  `.trim();

  try {
    await transporter.sendMail({
      from: env.MAIL_FROM!,
      to: env.CONTACT_NOTIFY_TO!,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `[Portfolio Contact] ${safeSubject}`,
      text,
      html,
    });
    return 'sent';
  } catch (err) {
    logger.error({ err, msgId: msg.id }, 'Failed to send email notification');
    return 'failed';
  }
}

