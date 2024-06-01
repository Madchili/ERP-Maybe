import pool from '../db';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

const getUserById = async (id: number): Promise<User | null> => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0] || null;
};

const createUser = async (username: string, password: string, email: string): Promise<User> => {
  const res = await pool.query(
    'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
    [username, password, email],
  );
  return res.rows[0];
};

const getAllUsers = async (): Promise<User[]> => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

export { getUserById, createUser, getAllUsers };
