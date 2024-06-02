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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4 border border-gray-300 rounded-lg">Add Orders</h1>
      <div className="mb-6">
        <AddOrderForm onOrderAdded={handleOrderAdded} />
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-4 bg-white border border-gray-200 rounded shadow-sm"
          >
            <span className="font-medium">Order {order.id}</span> - User{' '}
            <span className="font-medium">{order.user_id}</span> - Total ${' '}
            <span className="font-medium">
              {typeof order.total_amount === 'number'
                ? order.total_amount.toFixed(2)
                : '0.00'}
            </span>{' '}
            - Status{' '}
            <span className={`font-medium ${String(order.progress_status) === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
              {order.progress_status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddOrdersPage
