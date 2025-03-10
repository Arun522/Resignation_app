import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function MyResignations() {
  const [resignations, setResignations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchResignations();
  }, []);

  const fetchResignations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/my_resignations', {
        headers: { Authorization: token },
      });
      setResignations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching resignations:', error);
      setResignations([]); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Resignations</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-4 text-left">Reason</th>
                <th className="py-2 px-4 text-left">Last Working Day</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {resignations.map((r) => (
                <tr key={r._id} className="border-b">
                  <td className="py-2 px-4">{r.reason}</td>
                  <td className="py-2 px-4">{r.lwd}</td>
                  <td className="py-2 px-4">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {resignations.length === 0 && (
            <p className="mt-4 text-gray-600">No resignations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
