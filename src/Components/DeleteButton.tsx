// src/Components/DeleteButton.tsx
'use client'

interface DeleteButtonProps {
  userId: number
  onDelete: (id: number) => void
}

const DeleteButton = ({ userId, onDelete }: DeleteButtonProps) => {
  const handleDelete = () => {
    onDelete(userId)
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
    >
      Delete
    </button>
  )
}

export default DeleteButton
