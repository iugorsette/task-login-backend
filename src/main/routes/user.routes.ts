import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeLogin, makeRegister } from '../factory'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegister()))
  router.post('/login', adaptRoute(makeLogin()))
}
