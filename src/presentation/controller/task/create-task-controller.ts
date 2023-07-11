import { Create, Task, TaskSchema } from 'src/domain'
import { HashPassword } from 'src/infra'
import { ReadToken } from 'src/infra/protocols/read-token'
import { badRequest, ok } from 'src/presentation/helper'
import { Controller, HttpRequest, HttpResponse } from 'src/presentation/protocols'

export class CreateTaskController implements Controller {
  constructor (
    protected readonly createTask: Create<Task>,
    protected readonly jwtAdapter: ReadToken,
    protected readonly bcrypt: HashPassword
  ) {}

  async handler ({ header, body }: HttpRequest): Promise<HttpResponse> {
    try {
      const check = this.jwtAdapter.readToken(header.token)
      this.validateToken(check, body)
      const taskValid: any = TaskSchema.safeParse(body)
      const { acknowledged }: any = await this.createTask.create(taskValid)
      if (!acknowledged) {
        throw new Error('Erro ao criar tarefa')
      }
      const message = 'Tarefa criada com sucesso'
      return ok({ message })
    } catch (error) {
      return badRequest(error.message)
    }
  }

  private validateToken (check: any, { userId }): void | HttpResponse {
    if (!check) {
      throw new Error('Token inválido')
    }
    if (!userId) {
      throw new Error('Usuário não encontrado')
    }
    if (userId !== check.id) {
      throw new Error('Ops, você não tem permissão para acessar essa página')
    }
  }
}
