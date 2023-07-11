import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateTask } from '../factory/task/create-task'

export default (router: Router): void => {
  router.post('/createTask', adaptRoute(makeCreateTask()))
}
