import { RequestHandler } from 'express'
import { ProductModel } from '../models/product'

export const getProducts: RequestHandler = async (_, res, next) => {
  try {
    const products = await ProductModel.find({})
    res.json(products)
  } catch (err) {
    next(new Error('Oops, something went wring'))
  }
}

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    res.json(await ProductModel.findById(req.params.id))
  } catch (err) {
    res.status(404)
    next(new Error('Product Not Found'))
  }
}
