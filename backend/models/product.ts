import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { Product } from '../@types/product'
import { ReviewSchema } from './review'

export const ProductModel = model<Product>(
  'Product',
  new Schema<Product>(
    {
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      name: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      brand: { type: String, required: true },
      category: { type: String, required: true },
      countInStock: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      numReviews: { type: Number, default: 0 },
      reviews: { type: [ReviewSchema], default: [] },
    },
    {
      timestamps: true,
    },
  ),
)
