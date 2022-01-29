import { User } from './user'
import { Review } from './review'

export type Product = {
  user: User
  name: string
  image: string
  description: string
  price: number
  brand: string
  category: string
  countInStock: number
  rating: number
  numReviews: number
  reviews: Review[]
}
