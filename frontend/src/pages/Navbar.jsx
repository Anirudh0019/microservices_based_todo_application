import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="w-full border-b-2  bg-white text-black px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="text-xl font-semibold">TodoApp</div>
      <div className="space-x-4 text-sm">
        {token ? (
          <button
            onClick={handleSignOut}
            className="px-4 py-1.5 border border-black rounded hover:bg-black hover:text-white transition"
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
