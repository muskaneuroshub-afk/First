import { Router } from 'express';
import { adminLimiter, adminAuthLockout } from '../middleware/rateLimiters';
import { adminAuth } from '../middleware/adminAuth';
import {
  listMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/adminController';

const router = Router();

// Apply lockout counter + rate limit + auth to all admin routes
router.use(adminAuthLockout, adminLimiter, adminAuth);

router.get('/messages', listMessages);
router.get('/messages/:id', getMessage);
router.patch('/messages/:id', updateMessageStatus);
router.delete('/messages/:id', deleteMessage);

export default router;

