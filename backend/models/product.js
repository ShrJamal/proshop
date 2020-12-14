import mongoose from "mongoose";
import { reviewSchema } from "./review.js";

export const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
});

export default mongoose.model("Product", productSchema);
