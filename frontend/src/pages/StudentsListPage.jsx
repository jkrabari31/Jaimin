import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function StudentsListPage() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');
  const [className, setClassName] = useState('');

  const load = () => api.get('/students', { params: { q, className } }).then((r) => setStudents(r.data));
  useEffect(load, []);

  return (<div>
    <h2>Student List</h2>
    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name" />
    <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Filter by class" />
    <button onClick={load}>Apply</button> <Link to="/students/add">Add New Student</Link>
    <table border="1" cellPadding="8"><thead><tr><th>Admission No</th><th>Name</th><th>Class</th><th>Section</th><th>Parent</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>{students.map((s) => <tr key={s.id}><td>{s.admissionNo}</td><td>{s.name}</td><td>{s.className}</td><td>{s.section}</td><td>{s.parentContact}</td><td>{s.status}</td><td><Link to={`/students/${s.id}`}>View / Edit</Link></td></tr>)}</tbody></table>
  </div>);
}
