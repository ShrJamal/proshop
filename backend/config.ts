import dotenv from 'dotenv'
import colors from 'colors'
import mongoose from 'mongoose'

dotenv.config()
colors.enable()

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (e) {
    console.error(`MongoDb Error: ${e}`.red.underline.bold)
    process.exit(1)
  }
}
