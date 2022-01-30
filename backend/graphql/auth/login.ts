import { objectType, extendType, stringArg, nonNull } from 'nexus'
import { loginValidation } from '../../helpers/validation'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const LoginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: objectType({
        name: 'LoginResult',
        definition(t) {
          t.string('token')
          t.string('error')
        },
      }),
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_root, { email, password }, { prisma }) {
        const { error } = loginValidation({ email, password })
        if (error) throw error
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error('Email or Password is invalid')
        }
        const { id, username, isAdmin } = user
        return {
          token: jwt.sign({ id, isAdmin }, process.env.JWT_SECRET ?? ''),
          id,
          username,
          email,
          isAdmin,
        }
      },
    })
    t.field('signout', {
      type: objectType({
        name: 'SignoutResult',
        definition(t) {
          t.boolean('success')
          t.string('error')
        },
      }),
      async resolve(_root) {
        return {}
      },
    })
  },
})
