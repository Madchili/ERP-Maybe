import pool from '../db'

interface Item {
  id: number
  order_id: number
  item_name: string
  item_price: number
  picked: boolean
  created_at: Date
}

const getItemsByOrderId = async (orderId: number): Promise<Item[]> => {
  const res = await pool.query('SELECT * FROM items WHERE order_id = $1', [
    orderId,
  ])
  return res.rows
}

const createItem = async (
  orderId: number,
  item_name: string,
  item_price: number,
): Promise<Item> => {
  const res = await pool.query(
    'INSERT INTO items (order_id, item_name, item_price) VALUES ($1, $2, $3) RETURNING *',
    [orderId, item_name, item_price],
  )
  return res.rows[0]
}

export { getItemsByOrderId, createItem }
