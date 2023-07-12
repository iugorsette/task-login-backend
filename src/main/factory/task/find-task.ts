import { JwtAdapter, BcryptAdapter } from 'src/infra'
import { TaskRepository } from 'src/infra/db/repositories/task-repository'
import { Controller } from 'src/presentation'
import { FindTaskController } from 'src/presentation/controller/task/find-task-controller'

export const makeGetTask = (): Controller => {
  const taskRepository = new TaskRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new FindTaskController(taskRepository, jwtAdapter, bcryptAdapter)
}
