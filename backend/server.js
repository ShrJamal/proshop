const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/api", (req, res) => {
  res.send("API Running");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/product/:id", (req, res) => {
  const id = req.params.id;
  res.json(products.find((p) => p._id === id));
});

app.listen(5000, () => {
  console.log("Server Running on http://localhost:5000");
});
