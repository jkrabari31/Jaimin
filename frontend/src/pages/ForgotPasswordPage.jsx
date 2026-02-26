import { useState } from 'react';
import { api } from '../api/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/forgot-password', { email });
    setMessage(data.message);
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: '80px auto', display: 'grid', gap: 10 }}>
      <h2>Forgot Password</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Registered Email" />
      <button>Submit</button>
      <p>{message}</p>
    </form>
  );
}
