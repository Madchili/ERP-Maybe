'use client'

import { useState, useEffect } from 'react'
import AddItemForm from '@/Components/AddItemForm'
import { fetchItems } from '@/utils/api'
import { Item } from '@/interfaces/Items'
import { Order } from '@/interfaces/Order'
import { fetchOrders } from '@/utils/api' // Ensure this import is correct

const AddItemsPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
  const [items, setItems] = useState<Item[]>([])
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

  useEffect(() => {
    if (selectedOrder) {
      const loadItems = async () => {
        try {
          const items = await fetchItems(selectedOrder)
          setItems(items)
        } catch (error) {
          setError('Error fetching items')
          console.error('Error fetching items:', error)
        }
      }

      loadItems()
    }
  }, [selectedOrder])

  const handleItemAdded = (newItem: Item) => {
    setItems([...items, newItem])
  }

  return (
    <div>
      <h1>Add Items to Order</h1>
      <div>
        <label>Select Order:</label>
        <select
          value={selectedOrder || ''}
          onChange={(e) => setSelectedOrder(parseInt(e.target.value, 10))}
        >
          <option value="" disabled>
            Select an order
          </option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              Order {order.id}
            </option>
          ))}
        </select>
      </div>
      {selectedOrder && (
        <>
          <AddItemForm orderId={selectedOrder} onItemAdded={handleItemAdded} />
          <h2>Items in Order</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.item_name} - $
                {typeof item.item_price === 'number'
                  ? item.item_price.toFixed(2)
                  : '0.00'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default AddItemsPage
