const todos = require('../models/todoModel');

exports.getTodos = (req, res) => {
  const userTodos = todos.filter(t => t.username === req.user.username);
  res.json(userTodos);
};

exports.addTodo = (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: Date.now().toString(),
    username: req.user.username,
    title,
    description,
    completed: false,
    createdAt: new Date(),
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id && t.username === req.user.username);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  Object.assign(todo, req.body);
  res.json(todo);
};

exports.deleteTodo = (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id && t.username === req.user.username);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
};
