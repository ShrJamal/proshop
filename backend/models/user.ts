import { model, Schema } from 'mongoose'
import { User } from '../@types/user'

export const UserModel = model<User>(
  'User',
  new Schema<User>(
    {
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    },
  ),
)
