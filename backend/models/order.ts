import { model, Schema } from 'mongoose'
import { Order } from '../@types/order'

export const OrderModel = model<Order>(
  'Order',
  new Schema<Order>(
    {
      user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
      ordersItems: [
        {
          name: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, default: 0 },
          product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true,
          },
        },
      ],
      shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
      },
      paymentMethod: { type: String, required: true },
      paymentResult: {
        id: { type: String, required: true },
        status: { type: String, required: true },
        update_time: { type: Date, required: true },
        email_address: { type: String, required: true },
      },
      taxPrice: { type: Number, default: 0 },
      shippingPrice: { type: Number, default: 0 },
      totalPrice: { type: Number, default: 0 },
      isPaid: { type: Boolean, default: true },
      deliveredAt: { type: Date, required: true },
    },
    {
      timestamps: true,
    },
  ),
)
