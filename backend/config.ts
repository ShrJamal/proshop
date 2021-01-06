import dotenv from 'dotenv';
import colors from 'colors';
import { connect } from 'mongoose';

dotenv.config();
colors.enable();

export async function connectDB() {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.error(`MongoDb Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
}
