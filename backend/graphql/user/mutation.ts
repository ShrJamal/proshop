import { extendType, stringArg } from 'nexus'
import { profileValidation } from '../../helpers/validation'
import { checkIfAuthenticated } from '../../middleware/auth'
import bcrypt from 'bcryptjs'
import { ProfileObjectType } from '.'

export const ProfileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateProfile', {
      args: {
        username: stringArg(),
        password: stringArg(),
      },
      type: ProfileObjectType,
      async resolve(_, input, { req, prisma }) {
        const id = checkIfAuthenticated(req)
        const { error } = profileValidation(input)
        if (error) throw error
        const user = await prisma.user.findFirst({ where: { id } })
        if (!user) {
          throw new Error('Ooops! Cant find user')
        }
        user.username = req.body.username || user.username
        user.password =
          (req.body.password &&
            (await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)))) ||
          user.password
        await prisma.user.update({
          data: user,
          where: { id: user.id },
        })
        return user
      },
    })
  },
})
