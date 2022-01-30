import create from 'zustand'
import axios from 'axios'
import { combine, persist, devtools } from 'zustand/middleware'
import type { User } from '../@types/user'
import { produce } from 'immer'

let store = combine(
  {
    user: null as User | null,
  },
  (set) => ({
    async loginUser(email: string, password: string) {
      let error = ''

      try {
        const { data: user } = await axios.post<User>(
          '/api/login',
          { email, password },
          { headers: { 'Content-Type': 'application/json' } },
        )
        if (!user?.token) {
          throw new Error('Invalid Token')
        }
        set((s) =>
          produce(s, (d) => {
            d.user = user
          }),
        )
      } catch (err) {
        error = String(err)
      }
      return error
    },
    async registerUser(username: string, email: string, password: string) {
      let error = ''
      try {
        const { data: user } = await axios.post<User>(
          '/api/signup',
          { username, email, password },
          { headers: { 'Content-Type': 'application/json' } },
        )
        if (!user?.token) {
          throw new Error('Invalid Token')
        }
        set((s) =>
          produce(s, (d) => {
            d.user = user
          }),
        )
      } catch (err) {
        error = String(err)
      }
      return error
    },
    async logout() {
      set((s) => ({ ...s, user: null }))
    },
  }),
)

// Add DevTools
store = devtools(store, { name: 'UserStore' })

export const useUserStore = create(
  persist(store, {
    name: 'user',
  }),
)
