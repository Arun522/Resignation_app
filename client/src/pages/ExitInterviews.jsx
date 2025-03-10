import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function ExitInterviews() {
  const token = localStorage.getItem('token');
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/exit_responses', {
        headers: { Authorization: token },
      });
      setResponses(res.data.data || []);
    } catch (error) {
      console.error('Error fetching exit responses:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Exit Interviews</h1>

        {responses.length === 0 && (
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-600">No exit interviews have been submitted yet.</p>
          </div>
        )}

        {responses.map((item) => {
          const employee = item.employeeId;
          const employeeName = employee
            ? `${employee.firstName || ''} ${employee.lastName || ''}`.trim()
            : 'Unknown Employee';

          return (
            <div key={item._id} className="bg-white rounded shadow p-4 mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Employee: {employeeName} {employee?.username && `(${employee.username})`}
              </h2>
              {item.responses && item.responses.length > 0 ? (
                item.responses.map((r, idx) => (
                  <div key={idx} className="ml-4 mb-3 border-l-2 pl-4 border-gray-200">
                    <p className="font-medium text-gray-800">
                      Q: {r.questionText}
                    </p>
                    <p className="text-gray-600">
                      A: {r.response}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No responses found for this employee.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
