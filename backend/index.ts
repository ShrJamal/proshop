import dotenv from 'dotenv'
import colors from 'colors'
import logger from './logger'
import { startServer } from './server'

async function main() {
  dotenv.config()
  colors.enable()
  try {
    await startServer()
  } catch (e) {
    console.error(`Main Error: ${e}`.red.underline.bold)
    logger.error(`Main Error: ${e}`)
    process.exit(1)
  }
}
main()
