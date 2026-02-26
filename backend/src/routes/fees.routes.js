import express from 'express';
import { v4 as uuid } from 'uuid';
import { db, ROLES } from '../data/store.js';
import { allowRoles, requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.post('/structure', allowRoles(ROLES.SCHOOL_ADMIN), (req, res) => {
  const payload = { id: uuid(), schoolId: req.user.schoolId, ...req.body };
  db.feeStructures.push(payload);
  res.status(201).json(payload);
});

router.get('/structure', (req, res) => {
  res.json(db.feeStructures.filter((f) => f.schoolId === req.user.schoolId));
});

router.post('/collect', allowRoles(ROLES.SCHOOL_ADMIN, ROLES.ACCOUNTANT), (req, res) => {
  const payload = { id: uuid(), schoolId: req.user.schoolId, receiptNo: `RCPT-${Date.now()}`, ...req.body };
  db.feePayments.push(payload);
  const student = db.students.find((s) => s.id === payload.studentId && s.schoolId === req.user.schoolId);
  if (student) student.feesDue = Math.max(0, (student.feesDue || 0) - payload.amountPaid);
  res.status(201).json(payload);
});

router.get('/receipt/:id', (req, res) => {
  const receipt = db.feePayments.find((f) => f.id === req.params.id && f.schoolId === req.user.schoolId);
  if (!receipt) return res.status(404).json({ message: 'Receipt not found' });
  const school = db.schools.find((s) => s.id === req.user.schoolId);
  const student = db.students.find((s) => s.id === receipt.studentId);
  res.json({ schoolName: school?.name, studentName: student?.name, ...receipt });
});

router.get('/reports', (req, res) => {
  const { className } = req.query;
  const schoolStudents = db.students.filter((s) => s.schoolId === req.user.schoolId);
  const allowedIds = className ? schoolStudents.filter((s) => s.className === className).map((s) => s.id) : schoolStudents.map((s) => s.id);
  const payments = db.feePayments.filter((p) => p.schoolId === req.user.schoolId && allowedIds.includes(p.studentId));

  res.json({
    collectionSummary: payments.reduce((acc, p) => acc + p.amountPaid, 0),
    outstandingDues: schoolStudents.filter((s) => allowedIds.includes(s.id) && s.feesDue > 0),
    studentPaymentHistory: payments
  });
});

export default router;
