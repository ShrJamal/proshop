export interface Order {
  orderItems: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  deliveredAt: Date;
}

interface OrderItem {
  name: string;
  quatity: number;
  image: string;
  price: number;
  product: string;
}
