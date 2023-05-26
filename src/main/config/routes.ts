import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const pathResolve = path.resolve('./src/main/routes')
  const routersFile = readdirSync(pathResolve)
  routersFile.map(async (file) => {
    (await import(`${pathResolve}/${file}`)).default(router)
  })
}
