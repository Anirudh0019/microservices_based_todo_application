import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../services/todo';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', reminder: false, date: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!form.title.trim()) return;
    if (isEditMode) {
      await updateTodo(editId, form);
    } else {
      await createTodo(form);
    }
    resetForm();
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setForm({
      title: todo.title,
      description: todo.description || '',
      reminder: todo.reminder || false,
      date: todo.date || '',
    });
    setEditId(todo.id);
    setIsEditMode(true);
    setShowDialog(true);
  };

  const resetForm = () => {
    setForm({ title: '', description: '', reminder: false, date: '' });
    setShowDialog(false);
    setIsEditMode(false);
    setEditId(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Your Todos</h1>
        <button
          onClick={() => setShowDialog(true)}
          className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition text-sm"
        >
          + New Item
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border px-3 py-2 rounded bg-white text-sm"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={() => handleDelete(todo.id)} />
              <div>
                <div className="font-medium">{todo.title}</div>
                {todo.description && <div className="text-gray-500 text-xs">{todo.description}</div>}
              </div>
            </div>
            <button
              onClick={() => handleEdit(todo)}
              className="text-xs border border-black px-2 py-1 rounded hover:bg-black hover:text-white"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">
              {isEditMode ? 'Edit Todo' : 'New Todo'}
            </h2>
            <input
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Description (optional)"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {/* Reminder toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Reminder</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={form.reminder}
                  onChange={(e) => setForm({ ...form, reminder: e.target.checked })}
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-black relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
                </div>
              </label>
            </div>

            {/* Date input if reminder is on */}
            {form.reminder && (
              <input
                type="date"
                className="w-full border border-gray-300 px-4 py-2 rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="px-4 py-2 text-sm border border-black rounded hover:bg-black hover:text-white"
              >
                {isEditMode ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
