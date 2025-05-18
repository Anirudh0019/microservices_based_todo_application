const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const { createUserTableIfNotExists } = require('./models/userModel');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await createUserTableIfNotExists();
  console.log(`Auth Service running on port ${PORT}`);
});
