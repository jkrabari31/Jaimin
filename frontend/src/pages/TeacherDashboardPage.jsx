import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function TeacherDashboardPage() {
  const [data, setData] = useState();
  useEffect(() => { api.get('/dashboards/teacher').then((r) => setData(r.data)); }, []);
  return <div><h2>Teacher Dashboard</h2><p>Assigned Classes: {data?.assignedClasses?.join(', ')}</p><Link to="/attendance/mark">Mark Attendance</Link><p>{data?.attendanceSummary}</p></div>;
}
