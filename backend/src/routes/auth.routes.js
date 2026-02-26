import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../data/store.js';
import { signToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  const user = db.users.find((u) => u.email === identifier || u.username === identifier);
  if (!user || !user.active) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user.id, role: user.role, schoolId: user.schoolId, email: user.email, username: user.username }
  });
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const exists = db.users.some((u) => u.email === email);
  return res.json({ message: exists ? 'Reset link sent (demo mode).' : 'If email is registered, reset link will be sent.' });
});

export default router;
