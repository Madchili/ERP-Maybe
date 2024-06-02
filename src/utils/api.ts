const API_URL = 'http://localhost:5000/api'
import { PublicUser } from '../interfaces/User'
import { InternalUser } from '../interfaces/User'

export const fetchUsers = async (): Promise<PublicUser[]> => {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) {
    throw new Error('Error fetching users')
  }
  return response.json()
}

export const createUser = async (
  username: string,
  password: string,
  email: string,
): Promise<InternalUser> => {
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
  return response.json()
}

export const deleteUser = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Error deleting user')
  }
  return response.json()
}

export async function fetchOrders() {
  const response = await fetch('http://localhost:5000/api/orders')
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  const orders = await response.json()
  return orders
}

export async function fetchItems(orderId: number) {
  const response = await fetch(
    `http://localhost:5000/api/orders/${orderId}/items`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch items')
  }
  const items = await response.json()
  return items
}

export async function createItem(
  orderId: number,
  item_name: string,
  item_price: number,
) {
  const response = await fetch(
    `http://localhost:5000/api/orders/${orderId}/items`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_name, item_price }),
    },
  )
  if (!response.ok) {
    throw new Error('Failed to create item')
  }
  const newItem = await response.json()
  return newItem
}
