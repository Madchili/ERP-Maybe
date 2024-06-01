const API_URL = 'http://localhost:5000/api';
import { PublicUser } from '../interfaces/User'
import { InternalUser } from '../interfaces/User'


export const fetchUsers = async (): Promise<PublicUser[]> => {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) {
    throw new Error('Error fetching users')
  }
  return response.json()
}


export const createUser = async (username: string, password: string, email: string): Promise<InternalUser> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  })
  if (!response.ok) {
    throw new Error('Error creating user')
  }
  return response.json();
}



export const deleteUser = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Error deleting user')
  }
  return response.json()
};
