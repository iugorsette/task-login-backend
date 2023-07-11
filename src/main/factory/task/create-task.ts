import { UserRepository, JwtAdapter, BcryptAdapter } from 'src/infra'
import { TaskRepository } from 'src/infra/db/repositories/task-repository'
import { Controller } from 'src/presentation'
import { CreateTaskController } from 'src/presentation/controller/task/create-task-controller'

export const makeCreateTask = (): Controller => {
//   const userRepository = new UserRepository()
  const taskRepository = new TaskRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new CreateTaskController(taskRepository, jwtAdapter, bcryptAdapter)
}
