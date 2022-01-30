import mongoose from 'mongoose'

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '')
  } catch (e) {
    console.error(`MongoDb Error: ${e}`.red.underline.bold)
    process.exit(1)
  }
}
