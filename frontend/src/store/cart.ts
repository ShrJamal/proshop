import produce from 'immer';
import create from 'zustand';
import { combine, persist, devtools } from 'zustand/middleware';

let store = combine(
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cartItems: Array<any>(),
  },
  (set, get) => ({
    async addToCart(productId: string, qty: number) {
      const itemIndex = get().cartItems.findIndex(
        (i) => i.productId === productId,
      );
      if (itemIndex == -1) {
        set((s) =>
          produce(s, (d) => {
            d.cartItems.push({ productId, qty });
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
          d.cartItems = d.cartItems.filter((v) => v.productId != productId);
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
