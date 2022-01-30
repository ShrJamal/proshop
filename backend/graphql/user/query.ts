import { extendType } from 'nexus'
import { ProfileObjectType } from '.'
import { checkIfAuthenticated } from '../../middleware/auth'

export const ProfileQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('profile', {
      type: ProfileObjectType,
      async resolve(_, __, { req, prisma }) {
        const id = checkIfAuthenticated(req)
        const user = await prisma.user.findFirst({ where: { id } })
        if (!user) {
          throw new Error('Ooops! Cant find user')
        }
        return {
          id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        }
      },
    })
  },
})
