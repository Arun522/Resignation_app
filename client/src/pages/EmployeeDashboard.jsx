import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';



export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [latestResignation, setLatestResignation] = useState(null);

  useEffect(() => {
    // 1. Check for token
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    

  
    fetchLatestResignation();
  }, [navigate]);

  const fetchLatestResignation = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/user/my_resignations', {
        headers: { Authorization: token },
      });
      const resignations = res.data.data || [];

      if (resignations.length > 0) {
        const latest = resignations[resignations.length - 1];
        setLatestResignation(latest);
      }
    } catch (error) {
      console.error('Error fetching resignations:', error);
    }
  };

  const handleSubmitResignation = () => {
    navigate('/submit-resignation');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userName || 'test23'}</h1>

        <div className="bg-white p-4 rounded shadow w-full max-w-3xl">
          <h2 className="text-lg font-semibold mb-2">Resignation Status</h2>
          {latestResignation ? (
            <p className="text-gray-600">
              Latest Status: <strong>{latestResignation.status}</strong>
            </p>
          ) : (
            <p className="text-gray-600">
              You haven't submitted any resignation requests yet.
            </p>
          )}
          <div className="mt-4">
            {latestResignation ? (
              <button
                onClick={() => navigate('/my-resignations')}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View All Resignation Requests
              </button>
            ) : (
              <button
                onClick={handleSubmitResignation}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Resignation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
