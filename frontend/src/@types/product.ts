import type { Review } from './review'

export interface Product {
  _id: string
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
