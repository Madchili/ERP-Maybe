'use client'

import { useState } from 'react'
import { createItem } from '@/utils/api'
import { Item } from '@/interfaces/Items'

interface AddItemFormProps {
  orderId: number
  onItemAdded: (newItem: Item) => void
}

const AddItemForm: React.FC<AddItemFormProps> = ({ orderId, onItemAdded }) => {
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState<number>(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newItem = await createItem(orderId, itemName, itemPrice)
      onItemAdded(newItem)
      setItemName('')
      setItemPrice(0)
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  return (
    <form
      className="space-y-4 p-6 bg-white shadow-md rounded"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label className="mb-2 font-medium text-lg text-blue-700">
          Item Name:
        </label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-800"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 font-medium text-lg text-blue-700">
          Item Price:
        </label>
        <input
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-800"
          type="number"
          step="0.01"
          value={itemPrice}
          onChange={(e) => setItemPrice(parseFloat(e.target.value))}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      >
        Add Item
      </button>
    </form>
  )
}

export default AddItemForm
