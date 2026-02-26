import jwt from 'jsonwebtoken';
import { db } from '../data/store.js';

const secret = process.env.JWT_SECRET || 'educore-dev-secret';

export const signToken = (user) => jwt.sign({ sub: user.id, role: user.role, schoolId: user.schoolId }, secret, { expiresIn: '8h' });

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const decoded = jwt.verify(token, secret);
    const user = db.users.find((u) => u.id === decoded.sub);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Insufficient role permissions' });
  next();
};
