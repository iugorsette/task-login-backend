import { FindOne, User } from 'src/domain'
import { badRequest, forbidden, notFound, ok } from '../helper'
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
      if (!user) {
        return forbidden({ message: 'Email ou senha inválidos' })
      }
      await this.authenticateUser(user.password, password)
      const checkPassword = await this.bcrypt.compare(password, user.password)
      if (!checkPassword) {
        return forbidden({ message: 'Email ou senha inválidos' })
      }
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

  private async authenticateUser (
    enteredPassword: string,
    password: string
  ): Promise<void | HttpResponse> {
    const checkPassword = await this.bcrypt.compare(password, enteredPassword)
    if (!checkPassword) {
      return forbidden({ message: 'Erro ao fazer login' })
    }
  }
}
