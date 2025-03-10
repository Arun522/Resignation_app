
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';
import {jwtDecode} from 'jwt-decode';


export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">
        <Link to="/">Resignation Management System</Link>
      </div>
      <div className="space-x-4">
        {role === 'admin' && (
          <>
            <Link to="/admin" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/admin/resignations" className="hover:underline">
              Resignations
            </Link>
            <Link to="/admin/exit-interviews" className="hover:underline">
              Exit Interviews
            </Link>
          </>
        )}
        {role === 'employee' && (
          <>
            <Link to="/employee" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/my-resignations" className="hover:underline">
              My Resignations
            </Link>
          </>
        )}
        {token ? (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
