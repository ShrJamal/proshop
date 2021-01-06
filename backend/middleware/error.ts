import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  next(new Error('EndPoint Not Found - ' + req.originalUrl));
}

export function errorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  console.error(`errorHandler ${err}`.red.underline);
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: err.message ?? err,
    code: err.code,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}
