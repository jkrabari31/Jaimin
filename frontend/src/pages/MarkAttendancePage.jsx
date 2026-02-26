import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../api/client';

export default function MarkAttendancePage() {
  const { state } = useLocation();
  const [students, setStudents] = useState([]);
  useEffect(() => { api.get('/students', { params: { className: state?.className || '5' } }).then((r) => setStudents(r.data.map((s) => ({ ...s, status: 'PRESENT', remarks: '' }))); }, []);

  const save = async () => {
    const records = students.map((s) => ({ studentId: s.id, status: s.status, remarks: s.remarks }));
    await api.post('/attendance/mark', { className: state?.className || '5', section: state?.section || 'A', date: state?.date || new Date().toISOString().slice(0, 10), records });
    alert('Attendance saved');
  };

  return <div><h2>Mark Attendance</h2><table border="1" cellPadding="8"><thead><tr><th>Name</th><th>Status</th><th>Remarks</th></tr></thead>
    <tbody>{students.map((s, idx) => <tr key={s.id}><td>{s.name}</td><td><select value={s.status} onChange={(e) => setStudents((prev) => prev.map((p, i) => i === idx ? { ...p, status: e.target.value } : p))}><option>PRESENT</option><option>ABSENT</option></select></td><td><input value={s.remarks} onChange={(e) => setStudents((prev) => prev.map((p, i) => i === idx ? { ...p, remarks: e.target.value } : p))} /></td></tr>)}</tbody></table>
    <button onClick={save}>Save Attendance</button></div>;
}
