import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapters'
import { makeCreateTask, makeDeleteTask, makeGetTask, makeUpdateTask } from '../factory/task'

export default (router: Router): void => {
  router.post('/task', adaptRoute(makeCreateTask()))
  router.get('/task', adaptRoute(makeGetTask()))
  router.put('/task', adaptRoute(makeUpdateTask()))
  router.delete('/task', adaptRoute(makeDeleteTask()))
}
