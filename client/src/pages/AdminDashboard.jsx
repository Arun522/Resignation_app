import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const token = localStorage.getItem('token');
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingExitCount, setPendingExitCount] = useState(0);
  const [completedExitCount, setCompletedExitCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const res = await axios.get('http://localhost:8080/api/admin/resignations', {
        headers: { Authorization: token },
      });
      const all = res.data.data || [];
      setPendingCount(all.filter((r) => r.status === 'pending').length);
      setApprovedCount(all.filter((r) => r.status === 'approved').length);
      setRejectedCount(all.filter((r) => r.status === 'rejected').length);

    
      const exit = await axios.get('http://localhost:8080/api/admin/exit_responses', {
        headers: { Authorization: token },
      });
      
      const responses = exit.data.data || [];
      setCompletedExitCount(responses.length);
      
      setPendingExitCount(approvedCount - responses.length);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">HR Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Pending Resignations</h2>
            <p className="text-gray-600 text-3xl mt-2">{pendingCount}</p>
            <p className="text-sm text-gray-500 mt-2">Resignation requests waiting for review.</p>
            <a
              href="/admin/resignations"
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              View All Resignations
            </a>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Approved Resignations</h2>
            <p className="text-gray-600 text-3xl mt-2">{approvedCount}</p>
            <p className="text-sm text-gray-500 mt-2">Resignations that have been approved.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Rejected Resignations</h2>
            <p className="text-gray-600 text-3xl mt-2">{rejectedCount}</p>
            <p className="text-sm text-gray-500 mt-2">Resignations that have been rejected.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Pending Exit Interviews</h2>
            <p className="text-gray-600 text-3xl mt-2">{pendingExitCount}</p>
            <p className="text-sm text-gray-500 mt-2">Exit interviews yet to be completed.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Completed Exit Interviews</h2>
            <p className="text-gray-600 text-3xl mt-2">{completedExitCount}</p>
            <p className="text-sm text-gray-500 mt-2">Exit interviews completed by employees.</p>
            <a
              href="/admin/exit-interviews"
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              View Exit Interviews
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
