import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Ooops Something went wrong" });
  }
});

// @desc    Fetch Single Product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else throw new Error("Not Found");
  } catch (error) {
    res.status(404).json({ message: "Product Not Found" });
  }
});

export default router;
