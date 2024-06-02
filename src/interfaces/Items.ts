export interface Item {
  id: number
  order_id: number
  item_name: string
  item_price: number
  picked: boolean
  created_at: string
}

export interface AddItemFormProps {
  orderId: number
  onItemAdded: (item: Item) => void
}
