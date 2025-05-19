const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
}
);

app.listen(5002, () => {
  console.log('Server is running on port 3000');
});