import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()
colors.enable()

import express, { RequestHandler } from 'express'
import { errorHandler, notFound } from './middleware/error'
import productsRouter from './routers/products'
import userRouter from './routers/user'
import path from 'path'
import mongoose from 'mongoose'
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
    res.json('API Running')
  })
}

// Error Handler
app.use(notFound).use(errorHandler)

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '')
    const PORT = process.env.PORT || 5000
    app.listen(PORT)
    console.log(`App listening on port ${PORT}...`.cyan.underline)
  } catch (e) {
    console.error(`MongoDb Error: ${e}`.red.underline.bold)
    process.exit(1)
  }
}
main()
