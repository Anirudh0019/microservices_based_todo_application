import axios from 'axios';

const TODO_API = axios.create({
  baseURL: 'http://localhost:5001',
});

TODO_API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getTodos = () => TODO_API.get('/todos');
export const createTodo = (todo) => TODO_API.post('/todos', todo);
