import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function StudentProfilePage() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => { api.get(`/students/${id}`).then((r) => setData(r.data)); }, [id]);
  if (!data) return <p>Loading...</p>;
  return <div><h2>Student Profile: {data.name}</h2><h4>Basic Info</h4><p>Class {data.className}-{data.section}</p><h4>Attendance History</h4><p>{data.attendanceHistory.length} records</p><h4>Fee History</h4><p>{data.feeHistory.length} records</p><button>Edit</button> <button>Promote</button> <button>Deactivate</button></div>;
}
