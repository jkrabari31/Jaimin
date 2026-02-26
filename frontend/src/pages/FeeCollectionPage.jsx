import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function FeeCollectionPage() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [receipt, setReceipt] = useState();

  useEffect(() => { api.get('/students').then((r) => { setStudents(r.data); setStudentId(r.data[0]?.id || ''); }); }, []);
  const selected = students.find((s) => s.id === studentId);

  const collect = async () => {
    const { data } = await api.post('/fees/collect', { studentId, amountPaid: Number(amountPaid), paymentDate, paymentMode });
    setReceipt(data);
  };

  return <div><h2>Fee Collection</h2><select value={studentId} onChange={(e) => setStudentId(e.target.value)}>{students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
  <p>Total Fee: ₹{(selected?.feesDue || 0) + Number(amountPaid || 0)} | Paid: ₹{amountPaid} | Due: ₹{selected?.feesDue || 0}</p>
  <input value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} placeholder="Amount Paid" />
  <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
  <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}><option>Cash</option><option>UPI</option><option>Bank</option></select>
  <button onClick={collect}>Generate Receipt</button>
  {receipt && <p>Receipt Generated: <Link to={`/fees/receipt/${receipt.id}`}>{receipt.receiptNo}</Link></p>}
  </div>;
}
