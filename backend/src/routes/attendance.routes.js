import express from 'express';
import { v4 as uuid } from 'uuid';
import { db, ROLES } from '../data/store.js';
import { allowRoles, requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.post('/mark', allowRoles(ROLES.SCHOOL_ADMIN, ROLES.TEACHER), (req, res) => {
  const { className, section, date, records } = req.body;
  const now = new Date();
  const markedDate = new Date(date);
  const locked = (now - markedDate) / (1000 * 60 * 60) > 24;
  if (locked && req.user.role !== ROLES.SCHOOL_ADMIN) return res.status(403).json({ message: 'Past attendance locked after 24h' });

  records.forEach((r) => {
    db.attendance.push({ id: uuid(), schoolId: req.user.schoolId, className, section, date, ...r });
  });
  return res.json({ message: 'Attendance saved', dailyAttendancePct: Math.round((records.filter((r) => r.status === 'PRESENT').length / records.length) * 100) });
});

router.get('/report', (req, res) => {
  const { className, month, studentName } = req.query;
  let items = db.attendance.filter((a) => a.schoolId === req.user.schoolId);
  if (className) items = items.filter((a) => a.className === className);
  if (month) items = items.filter((a) => a.date.startsWith(month));

  if (studentName) {
    const matches = db.students.filter((s) => s.schoolId === req.user.schoolId && s.name.toLowerCase().includes(studentName.toLowerCase())).map((s) => s.id);
    items = items.filter((a) => matches.includes(a.studentId));
  }

  const defaulters = db.students.filter((s) => s.schoolId === req.user.schoolId && s.attendancePct < 75);
  res.json({ monthlyAttendanceSheet: items, defaulters });
});

export default router;
