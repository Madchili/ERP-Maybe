import express from 'express';
import cors from 'cors';
import { getUserById, createUser, getAllUsers } from './models/user';
import { createOrder, getAllOrders } from './models/order';
import { createItem, getItemsByOrderId } from './models/item';
import pool from './db';

const app = express();
const port = process.env.PORT || 5000;

// const corsOptions = {
//   origin: ['https://erp-maybe.vercel.app', 'https://erp-maybeoneday-6dfo.onrender.com', 'http://localhost:3000', 'http://localhost:3000/', 'https://erp-maybe.vercel.app/'],
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

// MARK: User Routes
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
  try {
    const newUser = await createUser(username, password, email);
    const users = await getAllUsers();
    res.status(201).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Username already exists') {
        res.status(409).send('Username already exists');
      } else {
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(500).send('Unknown Error');
    }
  }
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

  await pool.query('DELETE FROM items WHERE order_id IN (SELECT id FROM orders WHERE user_id = $1)', [id]);
  await pool.query('DELETE FROM orders WHERE user_id = $1', [id]);
  await pool.query('DELETE FROM users WHERE id = $1', [id]);

  const users = await getAllUsers();
  res.json(users);
});

// MARK: Order Routes
app.get('/api/orders', async (req, res) => {
  const orders = await getAllOrders();
  res.json(orders);
});

app.post('/api/orders', async (req, res) => {
  const { user_id } = req.body;
  const progress_status = 1;
  const total_amount = 0;

  const newOrder = await createOrder(user_id, total_amount, progress_status);
  const orders = await getAllOrders();
  res.status(201).json(orders);
});

// MARK: Item Routes
app.get('/api/orders/:orderId/items', async (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);
  if (isNaN(orderId)) {
    return res.status(400).send('Invalid order ID');
  }
  const items = await getItemsByOrderId(orderId);
  res.json(items);
});

app.post('/api/orders/:orderId/items', async (req, res) => {
  const orderId = parseInt(req.params.orderId, 10);
  if (isNaN(orderId)) {
    return res.status(400).send('Invalid order ID');
  }
  const orderCheck = await pool.query('SELECT id FROM orders WHERE id = $1', [orderId]);
  if (orderCheck.rowCount === 0) {
    return res.status(400).send('Order does not exist');
  }

  const { item_name, item_price }: { item_name: string, item_price: number } = req.body;
  const newItem = await createItem(orderId, item_name, item_price);
  const items = await getItemsByOrderId(orderId);
  res.status(201).json(items);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
