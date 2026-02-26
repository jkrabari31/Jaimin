import bcrypt from 'bcryptjs';

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  ACCOUNTANT: 'ACCOUNTANT',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
  STUDENT: 'STUDENT'
};

const passwordHash = bcrypt.hashSync('Pass@123', 10);

export const db = {
  schools: [
    { id: 'school-1', name: 'Sunrise Public School', academicYear: '2026-27' },
    { id: 'school-2', name: 'Green Valley School', academicYear: '2026-27' }
  ],
  users: [
    { id: 'u1', schoolId: null, email: 'super@educore.com', username: 'superadmin', role: ROLES.SUPER_ADMIN, passwordHash, active: true },
    { id: 'u2', schoolId: 'school-1', email: 'admin@sunrise.com', username: 'sunadmin', role: ROLES.SCHOOL_ADMIN, passwordHash, active: true },
    { id: 'u3', schoolId: 'school-1', email: 'accounts@sunrise.com', username: 'sunacc', role: ROLES.ACCOUNTANT, passwordHash, active: true },
    { id: 'u4', schoolId: 'school-1', email: 'teacher@sunrise.com', username: 'sunteacher', role: ROLES.TEACHER, passwordHash, active: true },
    { id: 'u5', schoolId: 'school-1', email: 'parent@sunrise.com', username: 'sunparent', role: ROLES.PARENT, passwordHash, active: true }
  ],
  students: [
    { id: 's1', schoolId: 'school-1', admissionNo: 'ADM001', name: 'Aarav Singh', className: '5', section: 'A', gender: 'Male', parentContact: '9876543210', dob: '2015-02-10', status: 'ACTIVE', attendancePct: 92, feesDue: 2500 },
    { id: 's2', schoolId: 'school-1', admissionNo: 'ADM002', name: 'Anaya Sharma', className: '5', section: 'A', gender: 'Female', parentContact: '9898989898', dob: '2014-11-12', status: 'ACTIVE', attendancePct: 71, feesDue: 4600 }
  ],
  attendance: [],
  feeStructures: [],
  feePayments: [],
  auditLogs: []
};
