import { JwtAdapter, BcryptAdapter } from 'src/infra'
import { TaskRepository } from 'src/infra/db/repositories/task-repository'
import { Controller } from 'src/presentation'
import { DeleteTaskController } from 'src/presentation/controller/task/delete-task-controller'

export const makeDeleteTask = (): Controller => {
  const taskRepository = new TaskRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new DeleteTaskController(taskRepository, jwtAdapter, bcryptAdapter)
}
