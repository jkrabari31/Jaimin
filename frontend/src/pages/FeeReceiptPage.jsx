import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function FeeReceiptPage() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState();
  useEffect(() => { api.get(`/fees/receipt/${id}`).then((r) => setReceipt(r.data)); }, [id]);
  if (!receipt) return <p>Loading...</p>;
  return <div><h2>Fee Receipt</h2><p>School: {receipt.schoolName}</p><p>Student: {receipt.studentName}</p><p>Amount Paid: ₹{receipt.amountPaid}</p><p>Payment Date: {receipt.paymentDate}</p><p>Receipt Number: {receipt.receiptNo}</p><button>Download PDF</button> <button>Print</button></div>;
}
