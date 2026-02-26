import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function SettingsPage() {
  const [data, setData] = useState();
  const [schoolName, setSchoolName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  useEffect(() => { api.get('/settings').then((r) => { setData(r.data); setSchoolName(r.data.school.name); setAcademicYear(r.data.school.academicYear); }); }, []);
  const save = async () => { await api.put('/settings', { name: schoolName, academicYear }); alert('Saved'); };
  if (!data) return <p>Loading...</p>;
  return <div><h2>Basic Settings</h2><input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} /><input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} /><button onClick={save}>Save</button><p>Classes Setup: {data.classes.join(', ')}</p><p>User Management Count: {data.users.length}</p></div>;
}
