// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import SubmitResignation from './pages/SubmitResignation';
import MyResignations from './pages/MyResignations';
import AdminDashboard from './pages/AdminDashboard';
import ManageResignations from './pages/ManageResignations';
import ExitInterviews from './pages/ExitInterviews';
import HomePage from './pages/HomePage'; 

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Employee */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/submit-resignation" element={<SubmitResignation />} />
        <Route path="/my-resignations" element={<MyResignations />} />
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/resignations" element={<ManageResignations />} />
        <Route path="/admin/exit-interviews" element={<ExitInterviews />} />
      </Routes>
  );
}

export default App;
