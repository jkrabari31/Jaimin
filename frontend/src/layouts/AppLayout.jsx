import { Link, Outlet } from 'react-router-dom';

const items = [
  ['Dashboard', '/dashboard'],
  ['Students', '/students'],
  ['Attendance', '/attendance/select'],
  ['Fees', '/fees/collect'],
  ['Reports', '/attendance/report'],
  ['Settings', '/settings']
];

export default function AppLayout() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh', fontFamily: 'Arial' }}>
      <aside style={{ background: '#0a2540', color: '#fff', padding: 16 }}>
        <h2>EduCore</h2>
        {items.map(([label, path]) => <Link key={path} to={path} style={{ display: 'block', color: '#fff', margin: '10px 0' }}>{label}</Link>)}
      </aside>
      <main style={{ padding: 20, background: '#f5f7fb' }}><Outlet /></main>
    </div>
  );
}
