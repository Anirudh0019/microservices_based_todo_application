import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full py-2 border border-black rounded hover:bg-black hover:text-white transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
