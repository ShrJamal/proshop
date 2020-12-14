import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "./data/db.js";
import productsRouter from "./routers/products.js";

dotenv.config();
colors.enable();
connectDB();

const app = express();

app.use('/api/products',productsRouter);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      .green.bold
  );
});
