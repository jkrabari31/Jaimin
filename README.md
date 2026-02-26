# EduCore MVP (React + Node.js)

This repository contains a beginner-friendly fullstack starter for your **School Management ERP** with:

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Auth**: JWT login with role-based redirects
- **MVP Screens**: Login, Forgot Password, Admin Dashboard, Students, Attendance, Fees, Teacher Dashboard, Parent Dashboard, Settings
- **ERP Extensibility**: Placeholder routes/pages for Exam, HR/Payroll, Library, Transport
- **Multi-school model (demo)**: school-level data isolation using `schoolId`

## Quick Start

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Demo Login Users

Password for all users: `Pass@123`

- School Admin: `admin@sunrise.com`
- Accountant: `accounts@sunrise.com`
- Teacher: `teacher@sunrise.com`
- Parent: `parent@sunrise.com`
- Super Admin: `super@educore.com`

## Notes

- This is a **development scaffold** with in-memory data.
- For production, add PostgreSQL, Redis, file storage, job queues, and proper report generation (PDF/Excel).
