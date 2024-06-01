'use client';

import React, { useState, useEffect } from 'react';
import { deleteUser } from '../utils/api';
import DeleteButton from './DeleteButton';
import { PublicUser } from '../interfaces/User';

interface UserListProps {
  initialUsers: PublicUser[];
  onUpdateUsers: (updatedUsers: PublicUser[]) => void;
}

const UserList: React.FC<UserListProps> = ({ initialUsers, onUpdateUsers }) => {
  const [users, setUsers] = useState<PublicUser[]>(initialUsers);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      onUpdateUsers(updatedUsers);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 max-w-6xl">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id} className="mb-2 flex justify-between items-center">
            <span>{user.username} - {user.email}</span>
            <DeleteButton userId={user.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
