import { useState } from 'react';
import { api } from '../api/client';

export default function FeeReportsPage() {
  const [className, setClassName] = useState('');
  const [report, setReport] = useState();
  const load = async () => setReport((await api.get('/fees/reports', { params: { className } })).data);
  return <div><h2>Fee Reports</h2><input placeholder="Class" value={className} onChange={(e) => setClassName(e.target.value)} /><button onClick={load}>Load</button>
    <p>Collection Summary: ₹{report?.collectionSummary || 0}</p>
    <p>Outstanding Dues List: {report?.outstandingDues?.length || 0}</p>
    <p>Payment History Rows: {report?.studentPaymentHistory?.length || 0}</p>
  </div>;
}
