import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()
colors.enable()

import express, { RequestHandler } from 'express'
import { errorHandler, notFound } from './middleware/error'
import productsRouter from './routers/products'
import userRouter from './routers/user'
import { connectDB } from './config'
import path from 'path'
// Create the express application
const app = express()
app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)

const __dirname = path.resolve()

// User Routers
app.use('/api', userRouter)

// Product Routers
app.use('/api/products', productsRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')))
  app.get('*', (_, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')),
  )
} else {
  app.get('/', (_, res) => {
    res.send('API Running')
  })
}

// Error Handler
app.use(notFound).use(errorHandler)

connectDB().then(() => {
  const PORT = process.env.PORT || 5000
  app.listen(PORT)
  console.log(`App listening on port ${PORT}...`.cyan.underline)
})
