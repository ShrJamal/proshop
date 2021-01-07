import create from 'zustand';
import axios from 'axios';
import { combine, persist, devtools } from 'zustand/middleware';
import { User } from '../@types/user';

let store = combine(
  {
    user: null as User | null,
    loading: false,
    error: '',
  },
  (set) => ({
    async loginUser(email: string, password: string) {
      try {
        console.log(email, password);

        set((s) => ({ ...s, loading: true, error: '' }));
        const { data: user } = await axios.post<User>(
          '/api/login',
          { email, password },
          { headers: { 'Content-Type': 'application/json' } },
        );
        if (!user?.token) {
          throw new Error('Invalid Token');
        }

        set((s) => ({ ...s, loading: false, user }));
      } catch (err) {
        console.error(err);
        set((s) => ({
          ...s,
          loading: false,
          error: err.response?.data?.message || err.message,
        }));
      }
    },
    async logout() {
      set((s) => ({ ...s, user: null }));
    },
  }),
);

// Add DevTools
store = devtools(store, 'UserStore');

//Persist
if (typeof window != 'undefined') {
  store = persist(store, {
    name: 'user',
  });
}

export const useUserStore = create(store);
