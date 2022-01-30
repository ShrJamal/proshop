import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

export type Context = {
  req: Request
  prisma: PrismaClient
}
