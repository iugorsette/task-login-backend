import { Task, TaskSchema, Update } from 'src/domain'
import { HashPassword } from 'src/infra'
import { ReadToken } from 'src/infra/protocols/read-token'
import { badRequest, notFound, ok, unauthorized } from 'src/presentation/helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from 'src/presentation/protocols'

export class UpdateTaskController implements Controller {
  constructor (
    protected readonly updateTask: Update<Task>,
    protected readonly jwtAdapter: ReadToken,
    protected readonly bcrypt: HashPassword
  ) {}

  async handler ({ header, body, query }: HttpRequest): Promise<HttpResponse> {
    try {
      if (!header.token) {
        return unauthorized({ message: 'Token não fornecido' })
      }
      if (!query.id) {
        return notFound({ message: 'Tarefa não informada' })
      }
      const check = this.jwtAdapter.readToken(header.token)
      const task = { ...body, userId: check.id, _id: query.id }

      const output: any = TaskSchema.safeParse(task)

      if (output.success === false) throw new Error(output.error)
      const newTask = output.data
      const updated: any = await this.updateTask.update(newTask)

      if (!updated.value) throw new Error('Erro ao atualizar tarefa')

      const message = 'Tarefa atualizada com sucesso'
      const oldtask = updated.value
      return ok({ message, newTask, oldtask })
    } catch (error) {
      return badRequest(error.message)
    }
  }
}
