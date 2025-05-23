import axios from 'axios';

const API = axios.create({
  baseURL: 'http://13.233.39.183:5000', // auth service base
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
