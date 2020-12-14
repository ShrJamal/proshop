import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    res.json(await Product.find({}));
  } catch (err) {
    next(new Error("Oops, something went wring"));
  }
});

// @desc    Fetch Single Product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    res.json(await Product.findById(req.params.id));
  } catch (err) {
    res.status(404);
    next(new Error("Product Not Found"));
  }
});

export default router;
