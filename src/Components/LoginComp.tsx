'use client'

import React, { useState, useEffect } from 'react'
import { fetchUsers } from '../utils/api'
import { PublicUser, User } from '../interfaces/User'

const LoginComp = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers()
        const userDummyPW = data.map((user) => ({
          ...user,
          password: 'DummyPW',
        }))
        setUsers(userDummyPW)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = users.find(
      (user) => user.username === username && user.password === password,
    )
    if (user) {
      setLoginMessage('User logged in successfully!')
      console.log('User logged in:', user)
    } else {
      setLoginMessage('Invalid username or password')
      console.log('Invalid username or password')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleLogin}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        {loginMessage && (
          <div className="mt-4 text-red-500">{loginMessage}</div>
        )}
      </form>
    </div>
  )
}

export default LoginComp
