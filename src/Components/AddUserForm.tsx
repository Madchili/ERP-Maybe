'use client'

import React, { useState } from 'react'
import { createUser } from '../utils/api'
import { PublicUser, InternalUser } from '../interfaces/User'

interface AddUserFormProps {
  onAddUser: (newUser: PublicUser) => void
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newUser: InternalUser = await createUser(username, password, email)
      const publicUser: PublicUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      }
      onAddUser(publicUser)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow-md rounded"
    >
      <div className="flex flex-col">
        <label htmlFor="username" className="mb-2 font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add User
      </button>
    </form>
  )
}

export default AddUserForm
