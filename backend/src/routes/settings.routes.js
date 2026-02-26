import express from 'express';
import { db, ROLES } from '../data/store.js';
import { allowRoles, requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', allowRoles(ROLES.SCHOOL_ADMIN), (req, res) => {
  const school = db.schools.find((s) => s.id === req.user.schoolId);
  const users = db.users.filter((u) => u.schoolId === req.user.schoolId);
  res.json({ school, classes: [...new Set(db.students.filter((s) => s.schoolId === req.user.schoolId).map((s) => s.className))], users });
});

router.put('/', allowRoles(ROLES.SCHOOL_ADMIN), (req, res) => {
  const school = db.schools.find((s) => s.id === req.user.schoolId);
  if (!school) return res.status(404).json({ message: 'School not found' });
  Object.assign(school, req.body);
  res.json(school);
});

export default router;
