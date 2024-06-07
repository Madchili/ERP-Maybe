'use client'

import { useEffect, useState } from 'react'
import { PublicUser } from '../interfaces/User'
import { deleteUser } from '../utils/api'

interface UserListProps {
  initialUsers: PublicUser[]
  onUpdateUsers: (updatedUsers: PublicUser[]) => void
}

const UserList: React.FC<UserListProps> = ({ initialUsers, onUpdateUsers }) => {
  const [users, setUsers] = useState<PublicUser[]>(initialUsers)

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  const handleDeleteUser = (id: number) => {
    deleteUser(id)
    const updatedUsers = users.filter((user) => user.id !== id)
    setUsers(updatedUsers)
    onUpdateUsers(updatedUsers)
  }

  return (
    <div>
      {/* <h2 className="text-xl mb-4">User List</h2> */}
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 flex justify-between items-center">
            <span>
              {user.username} - {user.email}
            </span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
