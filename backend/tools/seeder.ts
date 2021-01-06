import dotenv from 'dotenv';
import colors from 'colors';
import { OrderModel } from '../models/order';
import { ProductModel } from '../models/product';
import { UserModel } from '../models/user';
import products from './data/products';
import users from './data/users';
import { connectDB } from '../config';

dotenv.config();
colors.enable();

async function importData() {
  try {
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
    await OrderModel.deleteMany({});
    const insertedUsers = await UserModel.insertMany(users);
    const adminUser = insertedUsers[0];
    await ProductModel.insertMany(
      products.map((p) => ({ ...p, user: adminUser._id })),
    );
    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (e) {
    console.error(`Error on ImportData ${e.message}`.green.inverse);
    process.exit(1);
  }
}

async function destroyDate() {
  try {
    await ProductModel.deleteMany({});
    await UserModel.deleteMany({});
    await OrderModel.deleteMany({});
    console.log('Data Destroyed'.green.inverse);
    process.exit();
  } catch (e) {
    console.error(`Error on DestroyedData ${e.message}`.green.inverse);
    process.exit(1);
  }
}
async function main() {
  try {
    await connectDB();
    if (process.argv[2] === '-d') {
      await destroyDate();
    } else {
      await importData();
    }
  } catch (e) {
    console.error(`MongoDb Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
}
main();
