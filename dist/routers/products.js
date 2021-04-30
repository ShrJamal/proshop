"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = require("../controllers/products");
var router = express_1.default.Router();
// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
router.get('/', products_1.getProducts);
// @desc    Fetch Single Product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', products_1.getProductById);
exports.default = router;
