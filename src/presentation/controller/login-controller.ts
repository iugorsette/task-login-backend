import { User } from 'src/domain'
import { badRequest, ok } from '../helper'
import { Controller, HttpResponse } from '../protocols'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class LoginController implements Controller {
  constructor (protected readonly user: any) {}

  async handler ({ body }): Promise<HttpResponse> {
    try {
      const { email, password } = body

      const user = await this.user.findOne({ email })

      this.checkUserExists(user)
      await this.authenticateUser(user, password)
      const token = this.createToken(user)

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

  private createToken (user: any): string {
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id
      },
      process.env.JWT_SECRET
    )
    return token
  }
}
