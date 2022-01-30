import * as path from 'path'
import { makeSchema } from 'nexus'
import { AuthTypes } from './auth'
import { UserTypes } from './user'
import { ProductTypes } from './product'

export const graphQlSchema = makeSchema({
  types: [...AuthTypes, ...UserTypes, ...ProductTypes],
  contextType: {
    module: path.join(__dirname, './generated/contextModule.ts'),
    alias: 'ContextModule',
    export: 'Context',
  },
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})
