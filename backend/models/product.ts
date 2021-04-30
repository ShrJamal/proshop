import {
  createSchema,
  ExtractDoc,
  ExtractProps,
  Type,
  typedModel,
} from 'ts-mongoose'

import { ReviewSchema } from './review'

export const ProductSchema = createSchema({
  user: Type.objectId({
    required: true,
    ref: 'User',
  }),
  name: Type.string({ required: true }),
  image: Type.string({ required: true }),
  description: Type.string({ required: true }),
  price: Type.number({ required: true }),
  brand: Type.string({ required: true }),
  category: Type.string({ required: true }),
  countInStock: Type.number({ required: true }),
  rating: Type.number({}),
  numReviews: Type.number({ default: 0 }),
  reviews: Type.array({ default: [] }).of(ReviewSchema),
})

export const ProductModel = typedModel('Product', ProductSchema)
export type ProductDoc = ExtractDoc<typeof ProductSchema>
export type ProductProps = ExtractProps<typeof ProductSchema>
