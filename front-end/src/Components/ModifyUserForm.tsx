'use client'

import React, { useState, useEffect } from 'react'
import UserList from './UserList'
import { fetchUsers } from '../utils/api'
import { PublicUser } from '@/interfaces/User'

const ModifyUserForm: React.FC = () => {
  const [users, setUsers] = useState<PublicUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers()
        setUsers(response)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const handleUpdateUsers = (updatedUsers: PublicUser[]) => {
    setUsers(updatedUsers)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <h1>Modify Users</h1>
      <form className="space-y-4 p-6 bg-white shadow-md rounded">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add User
        </button>
      </form>
      <UserList initialUsers={users} onUpdateUsers={handleUpdateUsers} />
    </div>
  )
}

export default ModifyUserForm
