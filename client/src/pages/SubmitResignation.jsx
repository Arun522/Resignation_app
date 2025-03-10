import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SubmitResignation() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!selectedDate) {
        alert('Please select a Last Working Day.');
        return;
      }

      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      const lwd = `${day}/${month}/${year}`;

      await axios.post(
        'http://localhost:8080/api/user/resign',
        { reason, lwd },
        { headers: { Authorization: token } }
      );

      alert('Resignation submitted successfully!');
      navigate('/employee');
    } catch (error) {
      alert(error.response?.data?.message || 'Error submitting resignation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Submit Resignation</h1>

        {/* Reason */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Reason for Resignation</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={4}
            placeholder="Please provide the reason for your resignation"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Intended Last Working Day</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className="w-full border border-gray-300 rounded px-3 py-2"
     
            filterDate={(date) => {
              const day = date.getDay();
              return day !== 0 && day !== 6;
            }}
          />
          <p className="text-sm text-gray-500 mt-1">
            Note: The date cannot be a weekend or a holiday.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Resignation
          </button>
          <button
            onClick={() => navigate('/employee')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
