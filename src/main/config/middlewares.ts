import { bodyParser } from '../middlewares/body-parser'
import { Express } from 'express'
import cors from 'cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors())
}
