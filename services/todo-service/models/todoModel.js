const db = require('../db');

async function createTodoTableIfNotExists() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deadline_at DATE 
    )
  `);
}

async function getTodosByUser(username) {
  const result = await db.query('SELECT * FROM todos WHERE username = $1 ORDER BY created_at DESC', [username]);
  return result.rows;
}

async function addTodo(username, title, description,date) {
  const result = await db.query(
    'INSERT INTO todos (username, title, description,deadline_at) VALUES ($1, $2, $3,$4) RETURNING *',
    [username, title, description, date]
  );
  console.log(username+" "+  title + " " + description+" "+date);
  return result.rows[0];
}

async function updateTodo(id, username, updates) {
  const fields = [];
  const values = [id, username];
  let index = 3;

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${index++}`);
    values.push(value);
  }

  const result = await db.query(
    `UPDATE todos SET ${fields.join(', ')} WHERE id = $1 AND username = $2 RETURNING *`,
    values
  );
  return result.rows[0];
}

async function deleteTodo(id, username) {
  await db.query('DELETE FROM todos WHERE id = $1 AND username = $2', [id, username]);
}

module.exports = {
  createTodoTableIfNotExists,
  getTodosByUser,
  addTodo,
  updateTodo,
  deleteTodo,
};
