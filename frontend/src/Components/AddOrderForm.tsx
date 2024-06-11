'use client'

import { useState, useEffect } from 'react'

interface AddOrderFormProps {
  onOrderAdded: (order: any) => void
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({ onOrderAdded }) => {
  const [users, setUsers] = useState<any[]>([])
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users')
        const users = await response.json()
        setUsers(users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          progress_status: 1, // Initial progress status (1-5 finns i databasen)
        }),
      })
      const newOrder = await response.json()
      onOrderAdded(newOrder)
      setUserId(null)
    } catch (error) {
      console.error('Error adding order:', error)
    }
  }

  return (

    <div
    className="w-[350px] flex flex-col items-center justify-center"
    >
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div>
        <label>User:</label>
        <select
        className="border border-gray rounded-lg p-1"
          value={userId || ''}
          onChange={(e) => setUserId(parseInt(e.target.value, 10))}
          required
        >
          <option  value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="border border-gray-300 rounded-lg p-2 bg-green-300 my-2">Add Order</button>
    </form>
    </div>
  )
}

export default AddOrderForm
