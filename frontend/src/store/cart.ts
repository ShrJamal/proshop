import produce from 'immer';
import create from 'zustand';
import { combine, persist, devtools } from 'zustand/middleware';
import { Product } from '../@types/product';

let store = combine(
  {
    cartItems: Array<{ product: Product; qty: number }>(),
  },
  (set, get) => ({
    async addToCart(product: Product, qty: number) {
      const itemIndex = get().cartItems.findIndex(
        (i) => i.product._id === product._id,
      );

      if (itemIndex == -1) {
        set((s) =>
          produce(s, (d) => {
            d.cartItems.push({ product, qty });
          }),
        );
      } else {
        set((s) =>
          produce(s, (d) => {
            d.cartItems[itemIndex] = { ...d.cartItems[itemIndex], qty };
          }),
        );
      }
    },
    async removeItem(productId: string) {
      set((s) =>
        produce(s, (d) => {
          d.cartItems = d.cartItems.filter((v) => v.product._id != productId);
        }),
      );
    },
  }),
);

// Add DevTools
store = devtools(store, 'CartStore');

//Persist
if (typeof window != 'undefined') {
  store = persist(store, {
    name: 'cart',
  });
}

export const useCartStore = create(store);
