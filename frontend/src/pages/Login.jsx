import React, { useState } from 'react';  // Add React import
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');  // Add state for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous errors
    
    try {
      const res = await login(form);
      
      // Check if response and token exist
      if (res && res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
        console.error('Invalid response:', res);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            placeholder="Username" 
            value={form.username} 
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
          />
        </div>
        <div className="form-group">
          <input 
            placeholder="Password" 
            type="password" 
            value={form.password} 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}