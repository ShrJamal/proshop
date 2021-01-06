import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/product';

export async function getProducts(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (err) {
    next(new Error('Oops, something went wring'));
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.json(await ProductModel.findById(req.params.id));
  } catch (err) {
    res.status(404);
    next(new Error('Product Not Found'));
  }
}
