'use client';

import React, { useState, useEffect, useCallback } from 'react';
import UserList from '@/Components/UserList';
import AddUserForm from '@/Components/AddUserForm'; // Ensure correct path
import { fetchUsers, createUser } from '@/utils/api';
import { PublicUser, InternalUser } from '@/interfaces/User';

const HomePage = () => {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateUsers = useCallback((updatedUsers: PublicUser[]) => {
    setUsers(updatedUsers);
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        const userDummyPW = data.map(user => ({
          ...user,
          password: 'DummyPW', // Add dummy password
        }));
        setUsers(userDummyPW);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []); // Ensure dependency array is correct

  const handleAddUser = async (username: string, password: string, email: string) => {
    try {
      const newUser: InternalUser = await createUser(username, password, email);
      const publicUser: PublicUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };
      setUsers((prevUsers) => [...prevUsers, publicUser]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1>Bästa sidan</h1>
      <AddUserForm onUpdateUsers={handleAddUser} />
      <UserList initialUsers={users} onUpdateUsers={handleUpdateUsers} />
    </div>
  );
};

export default HomePage;
