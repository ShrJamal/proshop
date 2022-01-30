import { ProfileQuery } from './query'
import { ProfileMutation } from './mutation'
import { objectType } from 'nexus'

export const ProfileObjectType = objectType({
  name: 'Profile',
  definition(t) {
    t.string('id')
    t.string('username')
    t.string('email')
    t.boolean('isAdmin')
  },
})
export const UserTypes = [ProfileQuery, ProfileMutation, ProfileObjectType]
