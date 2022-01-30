import { Request } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import jwt from 'jsonwebtoken'

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const _id = checkIfAuthenticated(req)
    req.body._id = _id
    next()
  } catch (err) {
    res.status(401)
    next(err)
  }
}

export function checkIfAuthenticated(req: Request): string {
  let token = ''
  const authorization = req.header('Authorization')
  if (authorization?.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
  }
  if (!token) throw new Error('No Authorization no Token')
  const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '')
  const _id = typeof decoded === 'string' ? decoded : decoded['_id']
  return String(_id)
}
