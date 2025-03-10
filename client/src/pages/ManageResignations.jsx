import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function ManageResignations() {
  const [resignations, setResignations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchResignations();
  }, []);

  const fetchResignations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/resignations', {
        headers: { Authorization: token },
      });
      setResignations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching resignations:', error);
    }
  };

  const handleApprove = async (resignationId) => {
    const newLwd = prompt('Enter new Last Working Day (DD/MM/YYYY) if needed:', '31/03/2025');
    try {
      await axios.put(
        'http://localhost:8080/api/admin/conclude_resignation',
        {
          resignationId,
          approved: true,
          lwd: newLwd,
        },
        { headers: { Authorization: token } }
      );
      alert('Resignation approved');
      fetchResignations();
    } catch (error) {
      alert(error.response?.data?.message || 'Error approving resignation');
    }
  };

  const handleReject = async (resignationId) => {
    try {
      await axios.put(
        'http://localhost:8080/api/admin/conclude_resignation',
        {
          resignationId,
          approved: false,
        },
        { headers: { Authorization: token } }
      );
      alert('Resignation rejected');
      fetchResignations();
    } catch (error) {
      alert(error.response?.data?.message || 'Error rejecting resignation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Resignations</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-4 text-left">Employee</th>
                <th className="py-2 px-4 text-left">Date Submitted</th>
                <th className="py-2 px-4 text-left">Reason</th>
                <th className="py-2 px-4 text-left">Intended Last Day</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Exit Date</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resignations.map((r) => {
                const employee = r.employeeId;
                const employeeName = employee
                  ? `${employee.firstName || ''} ${employee.lastName || ''}`.trim()
                  : 'Unknown';

                const dateSubmitted = r.dateSubmitted || '28/03/2025';

                let actions;
                if (r.status === 'pending') {
                  actions = (
                    <>
                      <button
                        onClick={() => handleApprove(r._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(r._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
                      >
                        Reject
                      </button>
                    </>
                  );
                } else if (r.status === 'approved') {
                  actions = <span className="text-green-700 font-semibold">Completed</span>;
                } else if (r.status === 'rejected') {
                  actions = <span className="text-red-700 font-semibold">Rejected</span>;
                }

                let statusCell;
                if (r.status === 'approved') {
                  statusCell = <span className="text-green-600">{r.status}</span>;
                } else if (r.status === 'rejected') {
                  statusCell = <span className="text-red-600">{r.status}</span>;
                } else {
                  statusCell = <span className="text-yellow-600">{r.status}</span>;
                }

                const exitDate = r.status === 'approved' ? r.lwd : '-';

                return (
                  <tr key={r._id} className="border-b">
                    <td className="py-2 px-4">{employeeName}</td>
                    <td className="py-2 px-4">{dateSubmitted}</td>
                    <td className="py-2 px-4">{r.reason}</td>
                    <td className="py-2 px-4">{r.lwd}</td>
                    <td className="py-2 px-4">{statusCell}</td>
                    <td className="py-2 px-4">{exitDate}</td>
                    <td className="py-2 px-4">{actions}</td>
                  </tr>
                );
              })}
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
