import { Create, Task, TaskSchema } from 'src/domain'
import { HashPassword } from 'src/infra'
import { ReadToken } from 'src/infra/protocols/read-token'
import { badRequest, created, unauthorized } from 'src/presentation/helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from 'src/presentation/protocols'

export class CreateTaskController implements Controller {
  constructor (
    protected readonly createTask: Create<Task>,
    protected readonly jwtAdapter: ReadToken,
    protected readonly bcrypt: HashPassword
  ) {}

  async handler ({ header, body }: HttpRequest): Promise<HttpResponse> {
    try {
      if (!header.token) {
        return unauthorized({ message: 'Token não fornecido' })
      }
      const check = this.jwtAdapter.readToken(header.token)

      const task = { ...body, userId: check.id }

      const output: any = TaskSchema.safeParse(task)

      if (output.success === false) throw new Error(output.error)
      const { acknowledged }: any = await this.createTask.create(output.data)
      if (!acknowledged) {
        throw new Error('Erro ao criar tarefa')
      }
      const message = 'Tarefa criada com sucesso'
      return created({ message })
    } catch (error) {
      return badRequest(error.message)
    }
  }
}
