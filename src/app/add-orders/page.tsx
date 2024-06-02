'use client'

import { useState, useEffect } from 'react'
import AddOrderForm from '@/Components/AddOrderForm'
import { fetchOrders } from '@/utils/api'
import { Order } from '@/interfaces/Order'

const AddOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orders = await fetchOrders()
        setOrders(orders)
      } catch (error) {
        setError('Error fetching orders')
        console.error('Error fetching orders:', error)
      }
    }

    loadOrders()
  }, [])

  const handleOrderAdded = (newOrder: Order) => {
    setOrders((prevOrders) => [...prevOrders, newOrder])
  }

  return (
    <div>
      <h1>Add Orders</h1>
      <AddOrderForm onOrderAdded={handleOrderAdded} />
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order {order.id} - User {order.user_id} - Total $
            {typeof order.total_amount === 'number'
              ? order.total_amount.toFixed(2)
              : '0.00'}{' '}
            - Status {order.progress_status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AddOrdersPage
