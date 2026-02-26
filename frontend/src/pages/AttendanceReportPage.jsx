import { useState } from 'react';
import { api } from '../api/client';

export default function AttendanceReportPage() {
  const [filters, setFilters] = useState({ className: '', month: '' });
  const [data, setData] = useState();
  const load = async () => setData((await api.get('/attendance/report', { params: filters })).data);
  return <div><h2>Attendance Report</h2>
    <input placeholder="Class" onChange={(e) => setFilters({ ...filters, className: e.target.value })} />
    <input placeholder="Month (YYYY-MM)" onChange={(e) => setFilters({ ...filters, month: e.target.value })} />
    <button onClick={load}>Load</button>
    <p>Monthly Sheet Rows: {data?.monthlyAttendanceSheet?.length || 0}</p>
    <p>Defaulter List (&lt;75%): {data?.defaulters?.length || 0}</p>
  </div>;
}
