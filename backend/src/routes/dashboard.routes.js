import express from 'express';
import { db, ROLES } from '../data/store.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/admin', (req, res) => {
  const schoolId = req.user.schoolId;
  const students = db.students.filter((s) => s.schoolId === schoolId);
  const payments = db.feePayments.filter((p) => p.schoolId === schoolId && p.paymentDate.startsWith(new Date().toISOString().slice(0, 7)));

  const totalStudents = students.length;
  const attendancePct = students.length ? Math.round(students.reduce((a, b) => a + (b.attendancePct || 0), 0) / students.length) : 0;
  const feesCollected = payments.reduce((a, b) => a + b.amountPaid, 0);
  const outstandingDues = students.reduce((a, b) => a + (b.feesDue || 0), 0);

  res.json({
    totalStudents,
    attendancePct,
    feesCollected,
    outstandingDues,
    alerts: {
      lowAttendance: students.filter((s) => (s.attendancePct || 0) < 75),
      overdueFees: students.filter((s) => (s.feesDue || 0) > 0)
    }
  });
});

router.get('/teacher', (req, res) => {
  if (![ROLES.TEACHER, ROLES.SCHOOL_ADMIN].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  const classes = [...new Set(db.students.filter((s) => s.schoolId === req.user.schoolId).map((s) => `${s.className}-${s.section}`))];
  res.json({ assignedClasses: classes, attendanceSummary: 'Today attendance pending for 1 class' });
});

router.get('/parent', (req, res) => {
  const student = db.students.find((s) => s.schoolId === req.user.schoolId);
  const payments = db.feePayments.filter((p) => p.schoolId === req.user.schoolId && p.studentId === student?.id);
  res.json({
    childName: student?.name,
    attendancePct: student?.attendancePct || 0,
    feeStatus: student?.feesDue ? `Due ₹${student.feesDue}` : 'No due',
    paymentHistory: payments
  });
});

export default router;
