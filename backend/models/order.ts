import {
  createSchema,
  ExtractDoc,
  ExtractProps,
  Type,
  typedModel,
} from 'ts-mongoose';

export const OrderSchema = createSchema(
  {
    user: Type.objectId({
      required: true,
      ref: 'User',
    }),
    orderItems: Type.array({
      required: true,
    }).of({
      name: Type.string({ required: true }),
      quatity: Type.number({ default: 0 }),
      image: Type.string({ required: true }),
      price: Type.number({ required: true }),
      product: Type.objectId({ required: true, ref: 'Product' }),
    }),
    shippingAddress: Type.object({ required: true }).of({
      name: Type.string({ required: true }),
      address: Type.string({ required: true }),
      city: Type.string({ required: true }),
      postCode: Type.string({ required: true }),
      country: Type.string({ required: true }),
    }),
    paymentMethod: Type.string({ required: true }),
    paymentResult: Type.object({
      id: Type.string({ required: true }),
      status: Type.string({ required: true }),
      update_time: Type.string({ required: true }),
      email_address: Type.string({ required: true }),
    }),
    taxPrice: Type.number({ default: 0.0 }),
    shippingPrice: Type.number({ default: 0.0 }),
    totalPrice: Type.number({ default: 0.0 }),
    isPaid: Type.boolean({ default: false }),
    paidAt: Type.date({}),
    deliveredAt: Type.date({}),
  },
  {
    timestamps: true,
  },
);

export const OrderModel = typedModel('Order', OrderSchema);
export type OrderDoc = ExtractDoc<typeof OrderSchema>;
export type OrderProps = ExtractProps<typeof OrderSchema>;
