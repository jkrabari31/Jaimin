import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttendanceSelectPage() {
  const [className, setClassName] = useState('5');
  const [section, setSection] = useState('A');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const nav = useNavigate();
  return <div><h2>Select Class for Attendance</h2>
    <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Select Class" />
    <input value={section} onChange={(e) => setSection(e.target.value)} placeholder="Select Section" />
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <button onClick={() => nav('/attendance/mark', { state: { className, section, date } })}>Load Students</button></div>;
}
