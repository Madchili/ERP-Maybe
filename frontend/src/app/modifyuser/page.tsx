'use client'

import { useState, useEffect } from 'react'
import UserList from '../../Components/UserList'
import AddUserForm from '../../Components/AddUserForm'
import { fetchUsers } from '../../utils/api'
import { PublicUser } from '../../interfaces/User'

const ModifyUserPage = () => {
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
    <div>

      <h1 className="text-3xl text-red-500 my-5">Denna sidan fungerar inte nej :)
      </h1>
    <div className="flex space-x-10" >
      <AddUserForm onAddUser={handleAddUser} />
      <UserList initialUsers={users} onUpdateUsers={handleUpdateUsers} />
    </div>
    </div>
  )

}

export default ModifyUserPage
