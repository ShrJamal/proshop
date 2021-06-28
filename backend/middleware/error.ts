import { RequestHandler, ErrorRequestHandler } from 'express'

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404)
  next(new Error('EndPoint Not Found - ' + req.originalUrl))
}

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
  console.error(`errorHandler ${err}`.red.underline)
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    message: err.message ?? err,
    code: err.code,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
