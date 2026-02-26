import express from 'express';
import { v4 as uuid } from 'uuid';
import { db, ROLES } from '../data/store.js';
import { allowRoles, requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const { q = '', className } = req.query;
  let list = db.students.filter((s) => s.schoolId === req.user.schoolId);
  if (q) list = list.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  if (className) list = list.filter((s) => s.className === className);
  res.json(list);
});

router.post('/', allowRoles(ROLES.SCHOOL_ADMIN), (req, res) => {
  const newStudent = { id: uuid(), schoolId: req.user.schoolId, status: 'ACTIVE', attendancePct: 0, feesDue: 0, ...req.body };
  db.students.push(newStudent);
  res.status(201).json(newStudent);
});

router.get('/:id', (req, res) => {
  const student = db.students.find((s) => s.id === req.params.id && s.schoolId === req.user.schoolId);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({
    ...student,
    attendanceHistory: db.attendance.filter((a) => a.studentId === student.id),
    feeHistory: db.feePayments.filter((f) => f.studentId === student.id)
  });
});

router.put('/:id', allowRoles(ROLES.SCHOOL_ADMIN), (req, res) => {
  const idx = db.students.findIndex((s) => s.id === req.params.id && s.schoolId === req.user.schoolId);
  if (idx === -1) return res.status(404).json({ message: 'Student not found' });
  db.students[idx] = { ...db.students[idx], ...req.body };
  res.json(db.students[idx]);
});

export default router;
