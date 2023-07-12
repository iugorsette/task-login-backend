import { FindOne, User } from 'src/domain'
import { badRequest, ok } from '../helper'
import { Controller, HttpResponse } from '../protocols'
import { ComparePassword, CreateToken } from 'src/infra'

export class LoginController implements Controller {
  constructor (
    protected readonly findUser: FindOne<User>,
    protected readonly jwtAdapter: CreateToken,
    protected readonly bcrypt: ComparePassword
  ) {}

  async handler ({ body }): Promise<HttpResponse> {
    try {
      const { email, password } = body

      const user = await this.findUser.findOne({ email })
      this.checkUserExists(user)
      await this.authenticateUser(user.password, password)
      const token = this.jwtAdapter.createToken(user)

      return ok({
        name: user.name,
        userId: user._id,
        token
      })
    } catch (error) {
      return badRequest(error.message)
    }
  }

  private checkUserExists (user: User): void | HttpResponse {
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
  }

  private async authenticateUser (
    enteredPassword: string,
    password: string
  ): Promise<void | HttpResponse> {
    const checkPassword = await this.bcrypt.compare(password, enteredPassword)
    if (!checkPassword) {
      throw new Error('Senha incorreta')
    }
  }
}
