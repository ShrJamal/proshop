import express from 'express'
import { getProductById, getProducts } from '../controllers/products'

const router = express.Router()

// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
router.get('/', getProducts)

// @desc    Fetch Single Product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', getProductById)

export default router
