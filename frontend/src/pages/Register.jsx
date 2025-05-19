import React,{ useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Proceed to login')
      navigate('/login');
    } catch {
      alert('Register failed or username already exists');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
          Register
        </button>
      </form>
    </div>
  );
}
