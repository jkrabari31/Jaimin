import { useState } from 'react';
import { api } from '../api/client';

export default function FeeStructurePage() {
  const [form, setForm] = useState({ className: '', tuitionFee: 0, otherCharges: 0, totalAmount: 0 });
  const save = async () => { await api.post('/fees/structure', form); alert('Structure saved'); };
  return <div><h2>Fee Structure Setup</h2>{Object.keys(form).map((k) => <input key={k} placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} style={{ display: 'block', margin: 8 }} />)}<button onClick={save}>Save Structure</button></div>;
}
