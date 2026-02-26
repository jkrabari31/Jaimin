import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboards/admin').then((res) => setData(res.data)); }, []);

  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        <Card t="Total Students" v={data.totalStudents} /><Card t="Today's Attendance %" v={data.attendancePct} />
        <Card t="Fees Collected" v={`₹${data.feesCollected}`} /><Card t="Outstanding Dues" v={`₹${data.outstandingDues}`} />
      </div>
      <h3>Quick Buttons</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/students/add">Add Student</Link><Link to="/attendance/mark">Mark Attendance</Link><Link to="/fees/collect">Add Fee Entry</Link>
      </div>
      <h3>Alerts</h3>
      <p>Students below 75%: {data.alerts.lowAttendance.length}</p>
      <p>Overdue fees: {data.alerts.overdueFees.length}</p>
    </div>
  );
}

const Card = ({ t, v }) => <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}><strong>{t}</strong><p>{v}</p></div>;
