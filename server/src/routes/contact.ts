import { Router } from 'express';
import { submitContact } from '../controllers/contactController';
import { contactLimiter } from '../middleware/rateLimiters';
import { validate } from '../middleware/validate';
import { contactSchema } from '../schemas/contact';

const router = Router();

// Enforce JSON Content-Type
router.use((req, res, next) => {
  const ct = req.headers['content-type'] ?? '';
  if (!ct.includes('application/json')) {
    return res
      .status(415)
      .json({ success: false, message: 'Content-Type must be application/json' });
  }
  next();
});

router.post('/', contactLimiter, validate(contactSchema), submitContact);

export default router;

