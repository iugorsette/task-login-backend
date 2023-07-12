import { FindAll, Task } from 'src/domain'
import { HashPassword } from 'src/infra'
import { ReadToken } from 'src/infra/protocols/read-token'
import { badRequest, ok, unauthorized } from 'src/presentation/helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from 'src/presentation/protocols'

export class FindTaskController implements Controller {
  constructor (
    protected readonly findTask: FindAll<Task>,
    protected readonly jwtAdapter: ReadToken,
    protected readonly bcrypt: HashPassword
  ) {}

  async handler ({ header }: HttpRequest): Promise<HttpResponse> {
    try {
      if (!header.token) {
        return unauthorized({ message: 'Token não fornecido' })
      }

      const check = this.jwtAdapter.readToken(header.token)

      const tasks = await this.findTask.findAll(check.id)
      if (tasks.length === 0) {
        return ok({ message: 'Nenhuma tarefa cadastrada' })
      }
      return ok({ tasks })
    } catch (error) {
      return badRequest(error.message)
    }
  }
}
