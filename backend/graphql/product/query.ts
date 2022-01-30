import { extendType, objectType, stringArg, nonNull, list } from 'nexus'

export const ProductQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getProducts', {
      type: list(ProductType),
      async resolve(_, __, { prisma }) {
        const products = await prisma.product.findMany()
        return products
      },
    }),
      t.field('productById', {
        args: {
          id: nonNull(stringArg()),
        },
        type: ProductType,
        async resolve(_, { id }, { prisma }) {
          const prod = await prisma.product.findFirst({ where: { id } })
          return prod
        },
      })
  },
})

const ProductType = objectType({
  name: 'Product',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('image')
    t.string('description')
    t.float('price')
    t.string('brand')
    t.string('category')
    t.int('countInStock')
    t.float('rating')
    t.int('numReviews')
  },
})
