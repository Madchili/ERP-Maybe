import pool from '../db'

interface Order {
  id: number
  user_id: number
  total_amount: number
  progress_status: number
  created_at: Date
}

const getAllOrders = async (): Promise<Order[]> => {
  const res = await pool.query('SELECT * FROM orders')
  return res.rows
}

const createOrder = async (
  user_id: number,
  total_amount: number,
  progress_status: number,
): Promise<Order> => {
  const res = await pool.query(
    'INSERT INTO orders (user_id, total_amount, progress_status) VALUES ($1, $2, $3) RETURNING *',
    [user_id, total_amount, progress_status],
  )
  return res.rows[0]
}

export { getAllOrders, createOrder }
