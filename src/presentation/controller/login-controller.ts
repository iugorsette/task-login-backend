import { FindOne, User } from 'src/domain'
import { badRequest, ok } from '../helper'
import { Controller, HttpResponse } from '../protocols'
import bcrypt from 'bcryptjs'
import { CreateToken } from 'src/domain/usecases/createToken'

export class LoginController implements Controller {
  constructor (protected readonly findUser: FindOne<User>, protected readonly jwtAdapter: CreateToken) {}

  async handler ({ body }): Promise<HttpResponse> {
    try {
      const { email, password } = body

      const user = await this.findUser.findOne({ email })

      this.checkUserExists(user)
      await this.authenticateUser(user, password)
      const token = this.jwtAdapter.createToken(user)

      return ok({
        name: user.name,
        id: user._id,
        token
      })
    } catch (error) {
      console.log(error)
      return badRequest(error.message)
    }
  }

  private checkUserExists (user: User): void | HttpResponse {
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
  }

  private async authenticateUser (user: User, password: string): Promise<void | HttpResponse> {
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw new Error('Senha incorreta')
    }
  }
}
