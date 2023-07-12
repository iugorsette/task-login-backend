import { Delete } from 'src/domain'
import { HashPassword } from 'src/infra'
import { ReadToken } from 'src/infra/protocols/read-token'
import {
  badRequest,
  notFound,
  ok,
  unauthorized
} from 'src/presentation/helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from 'src/presentation/protocols'

export class DeleteTaskController implements Controller {
  constructor (
    protected readonly deleteTask: Delete,
    protected readonly jwtAdapter: ReadToken,
    protected readonly bcrypt: HashPassword
  ) {}

  async handler ({ header, query }: HttpRequest): Promise<HttpResponse> {
    try {
      if (!query.id) {
        return notFound({ message: 'Tarefa não informada' })
      }
      if (!header.token) {
        return unauthorized({ message: 'Token não fornecido' })
      }

      const check = this.jwtAdapter.readToken(header.token)

      if (!check) {
        return unauthorized({ message: 'Token inválido' })
      }

      const deletionResult: any = await this.deleteTask.delete(query.id)

      if (deletionResult.deletedCount === 0) {
        return notFound({
          message: 'Ops, tarefa não encontrada ou já deletada'
        })
      }
      if (!deletionResult.acknowledged) {
        return badRequest('Erro ao deletar tarefa no banco de dados')
      }
      const message = 'Tarefa deletada com sucesso'
      return ok({ message })
    } catch (error) {
      return badRequest(error.message)
    }
  }
}
