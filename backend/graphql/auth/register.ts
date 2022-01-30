import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { signupValidation } from '../../helpers/validation'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const RegisterMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: objectType({
        name: 'RegisterResult',
        definition(t) {
          t.string('token')
          t.string('error')
        },
      }),
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { username, email, password }, { prisma }) {
        const { error } = signupValidation({ username, email, password })
        if (error) throw error
        if (await prisma.user.findFirst({ where: { email } })) {
          throw new Error('User Already exist')
        }
        // Hash Password
        const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10))
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashed,
          },
        })
        if (user) {
          return {
            token: jwt.sign({ _id: user.id }, process.env.JWT_SECRET ?? ''),
            _id: user.id,
            username,
            email,
            isAdmin: user.isAdmin,
          }
        } else {
          throw new Error('Invalid User Data')
        }
      },
    })
  },
})
