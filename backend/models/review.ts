import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { Review } from '../@types/review'

export const ReviewSchema = new Schema<Review>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)
export const ReviewModel = model<Review>('Review', ReviewSchema)
