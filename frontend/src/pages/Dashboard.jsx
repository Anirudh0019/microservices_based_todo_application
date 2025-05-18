import React from 'react';
import { useEffect, useState } from 'react';
import { getTodos, createTodo } from '../services/todo';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const addTodo = async () => {
    await createTodo({ title });
    setTitle('');
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
