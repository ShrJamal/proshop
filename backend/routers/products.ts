import express from 'express';
import { ProductModel } from '../models/product';

const router = express.Router();

// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
router.get('/', async (_, res, next) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (err) {
    next(new Error('Oops, something went wring'));
  }
});

// @desc    Fetch Single Product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await ProductModel.findById(req.params.id));
  } catch (err) {
    res.status(404);
    next(new Error('Product Not Found'));
  }
});

export default router;
