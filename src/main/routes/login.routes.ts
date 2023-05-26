import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeLogin } from '../factory'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLogin()))
}
