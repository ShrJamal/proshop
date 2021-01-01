export function notFound(req, res, next) {
  const err = new Error('Not Found - ' + req.originalUrl);
  res.status(404);
  next(err);
}

export function errorHandler(err, _, res, __) {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}
