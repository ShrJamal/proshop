import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "./data/db.js";
import productsRouter from "./routers/products.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();
colors.enable();

const app = express();

app.get("/", (req, res) => {
  res.send("API Running");
});

// Product Routers
app.use("/api/products", productsRouter);

// Error Handler
app.use(notFound).use(errorHandler);

// Connect Db
connectDB().then(() => {
  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `Server Running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
        .green.bold
    );
  });
});
