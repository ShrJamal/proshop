import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import { graphQlSchema } from './graphql'
import { errorHandler, notFound } from './middleware/error'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 50, // limit each IP to 50 requests per windowMs
  }),
)
app.use(
  slowDown({
    windowMs: 60 * 1000, // 1 minute
    delayAfter: 20,
    delayMs: 500,
  }),
)

if (process.env.NODE_ENV === 'production') {
  // Security
  app.use(helmet())
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (_, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  )
} else {
  // Show routes called in console during development
  app.use(morgan('dev'))

  app.get('/', (_, res) => {
    res.send('API Running')
  })
}

export async function startServer() {
  const apollo = new ApolloServer({
    context({ req }) {
      return { req, prisma: new PrismaClient() }
    },
    schema: graphQlSchema,
    debug: true,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })
  await apollo.start()

  apollo.applyMiddleware({ app })

  // Add Error Middleware
  app.use(notFound).use(errorHandler)

  const PORT = Number(process.env.PORT || 3000)
  app.listen({ port: PORT })
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`,
  )
}
