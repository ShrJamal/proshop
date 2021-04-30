import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let token = ''
    const authorization = req.header('Authorization')
    if (authorization?.startsWith('Bearer')) {
      token = authorization.split(' ')[1]
    }
    if (!token) throw new Error('No Authorization no Token')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? '')
    req.body._id = decoded['_id'] ?? ''
    next()
  } catch (err) {
    res.status(401)
    next(err)
  }
}
