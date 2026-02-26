import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

const roleRoute = { SCHOOL_ADMIN: '/dashboard', ACCOUNTANT: '/fees/collect', TEACHER: '/teacher-dashboard', PARENT: '/parent-dashboard', SUPER_ADMIN: '/dashboard' };

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('admin@sunrise.com');
  const [password, setPassword] = useState('Pass@123');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { identifier, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav(roleRoute[data.user.role] || '/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={login} style={{ maxWidth: 360, margin: '80px auto', display: 'grid', gap: 10 }}>
      <h2>EduCore Login</h2>
      <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Email / Username" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button>Login</button>
      <Link to="/forgot-password">Forgot Password?</Link>
    </form>
  );
}
