import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StudentsListPage from './pages/StudentsListPage';
import AddStudentPage from './pages/AddStudentPage';
import StudentProfilePage from './pages/StudentProfilePage';
import AttendanceSelectPage from './pages/AttendanceSelectPage';
import MarkAttendancePage from './pages/MarkAttendancePage';
import AttendanceReportPage from './pages/AttendanceReportPage';
import FeeStructurePage from './pages/FeeStructurePage';
import FeeCollectionPage from './pages/FeeCollectionPage';
import FeeReceiptPage from './pages/FeeReceiptPage';
import FeeReportsPage from './pages/FeeReportsPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import ParentDashboardPage from './pages/ParentDashboardPage';
import SettingsPage from './pages/SettingsPage';
import PlaceholderPage from './pages/PlaceholderPage';
import AppLayout from './layouts/AppLayout';

const Private = ({ children }) => localStorage.getItem('token') ? children : <Navigate to="/login" replace />;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Private><AppLayout /></Private>}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="students" element={<StudentsListPage />} />
          <Route path="students/add" element={<AddStudentPage />} />
          <Route path="students/:id" element={<StudentProfilePage />} />
          <Route path="attendance/select" element={<AttendanceSelectPage />} />
          <Route path="attendance/mark" element={<MarkAttendancePage />} />
          <Route path="attendance/report" element={<AttendanceReportPage />} />
          <Route path="fees/structure" element={<FeeStructurePage />} />
          <Route path="fees/collect" element={<FeeCollectionPage />} />
          <Route path="fees/receipt/:id" element={<FeeReceiptPage />} />
          <Route path="fees/reports" element={<FeeReportsPage />} />
          <Route path="teacher-dashboard" element={<TeacherDashboardPage />} />
          <Route path="parent-dashboard" element={<ParentDashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="erp/exams" element={<PlaceholderPage title="Examination & Result Engine" />} />
          <Route path="erp/hr" element={<PlaceholderPage title="HR & Payroll" />} />
          <Route path="erp/library" element={<PlaceholderPage title="Library Management" />} />
          <Route path="erp/transport" element={<PlaceholderPage title="Transport Management" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
