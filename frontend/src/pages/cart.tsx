import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCartStore } from '../store/cart';

export default function CartPage() {
  const { productId } = useParams<{ productId: string }>();
  const search = useLocation().search;
  const qty = search ? Number(search.split('=')[1]) : 1;

  const { addToCart } = useCartStore();
  console.log(productId, search);
  useEffect(() => {
    if (productId) {
      addToCart(productId, qty);
    }
  }, [addToCart, productId, qty]);
  return <div>Cart Page</div>;
}
