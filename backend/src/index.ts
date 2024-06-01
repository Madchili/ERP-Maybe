import express from 'express';
import cors from 'cors';
import { getUserById, createUser, getAllUsers } from './models/user';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

app.get('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send('Invalid user ID');
  }
  const user = await getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/api/users', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = await createUser(username, password, email);
  const users = await getAllUsers();
  res.status(201).json(users);
});

app.delete('/api/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).send('Invalid user ID');
  }
  const user = await getUserById(id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  const users = await getAllUsers();
  res.json(users);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
