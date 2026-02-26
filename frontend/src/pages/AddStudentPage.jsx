import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

const initial = { admissionNo: '', name: '', dob: '', gender: '', className: '', section: '', fatherName: '', motherName: '', parentContact: '', email: '', address: '' };

export default function AddStudentPage() {
  const [form, setForm] = useState(initial);
  const nav = useNavigate();
  const save = async () => { await api.post('/students', form); nav('/students'); };

  return <div><h2>Add Student</h2>{Object.keys(initial).map((k) => <input key={k} placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} style={{ display: 'block', margin: 8, width: 300 }} />)}
    <button onClick={save}>Save</button> <button onClick={() => nav('/students')}>Cancel</button>
  </div>;
}
