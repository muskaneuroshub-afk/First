import { createHash } from 'crypto';
import { env } from '../config/env';

/**
 * Returns a SHA-256 hex hash of `ip` salted with IP_HASH_SALT.
 * The raw IP address is never stored.
 */
export function hashIp(ip: string): string {
  return createHash('sha256')
    .update(ip + env.IP_HASH_SALT)
    .digest('hex');
}

