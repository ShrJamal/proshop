import dotenv from "dotenv";
import colors from "colors";
import Order from "./models/order.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import { connectDB } from "./data/db.js";
import products from "./data/products.js";
import users from "./data/users.js";

dotenv.config();
colors.enable();
connectDB();

async function importData() {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    const insertedUsers = await User.insertMany(users);
    const adminUser = insertedUsers[0];
    await Product.insertMany(
      products.map((p) => ({ ...p, user: adminUser._id }))
    );
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (e) {
    console.error(`Error on ImportData ${e.message}`.green.inverse);
    process.exit(1);
  }
}

async function destroyDate() {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    console.log("Data Destroyed".green.inverse);
    process.exit();
  } catch (e) {
    console.error(`Error on DestroyedData ${e.message}`.green.inverse);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyDate();
} else {
  importData();
}
