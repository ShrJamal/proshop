import { Product } from './product'
import { User } from './user'

export type OrderItem = {
  name: string
  image: string
  price: number
  quantity: number
  product: Product
}
export type Order = {
  user: User
  ordersItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  paymentResult: PaymentResult
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  deliveredAt: Date
}

export type ShippingAddress = {
  name: string
  address: string
  city: string
  country: string
  postalCode: string
}
export type PaymentResult = {
  id: string
  status: string
  update_time: Date
  email_address: string
}
