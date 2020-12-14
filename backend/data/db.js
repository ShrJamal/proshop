import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDb Connected: ${connect.connection.host}`.cyan.underline);
  } catch (e) {
    console.error(`MongoDb Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
}
