'use client'

import React, { useState, useEffect } from 'react'
import UserList from '../../Components/UserList'
import AddUserForm from '../../Components/AddUserForm'
import { fetchUsers } from '../../utils/api'
import { PublicUser } from '../../interfaces/User' // Ensure correct path

const HomePage = () => {
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

  const handleAddUser = (newUser: PublicUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
  }

  const handleUpdateUsers = (updatedUsers: PublicUser[]) => {
    setUsers(updatedUsers)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center">
    <h1 className="text-3xl my-4">Lägg till användare</h1>
    <div className="flex">
        <div className="h-[350px]">
          <AddUserForm onAddUser={handleAddUser} />
        </div>
        {/* <div className="h-[350px] overflow-y-auto px-5 w-fit">
          <UserList initialUsers={users} onUpdateUsers={handleUpdateUsers}/>
        </div> */}
      </div>
      </div>
  )
}

export default HomePage
