import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ParentDashboardPage() {
  const [data, setData] = useState();
  useEffect(() => { api.get('/dashboards/parent').then((r) => setData(r.data)); }, []);
  return <div><h2>Parent Dashboard</h2><p>Child Attendance %: {data?.attendancePct}</p><p>Fee Status: {data?.feeStatus}</p><p>Payment History: {data?.paymentHistory?.length || 0}</p><button>Download Receipts</button></div>;
}
