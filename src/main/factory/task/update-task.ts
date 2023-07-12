import { JwtAdapter, BcryptAdapter } from 'src/infra'
import { TaskRepository } from 'src/infra/db/repositories/task-repository'
import { Controller } from 'src/presentation'
import { UpdateTaskController } from 'src/presentation/controller/task/update-task-controller'

export const makeUpdateTask = (): Controller => {
  const taskRepository = new TaskRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new UpdateTaskController(taskRepository, jwtAdapter, bcryptAdapter)
}
