import { badRequest, ok } from '../helper'
import { Controller, HttpResponse } from '../protocols'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class LoginController implements Controller {
  constructor (protected readonly user: any) {}

  async handler ({ body }): Promise<HttpResponse> {
    try {
      const { email, password } = body

      // check if user exists
      const user = await this.user.findOne({ email })
      console.log('user: ', user)
      if (!user) {
        return badRequest('Usuário não encontrado')
      }

      // check if password matches
      const checkPassword = await bcrypt.compare(password, user.password)

      if (!checkPassword) {
        return badRequest('Senha incorreta')
      }

      // create token
      const token = jwt.sign(
        {
          name: user.name,
          id: user._id
        },
        process.env.JWT_SECRET
      )

      return ok({
        name: user.name,
        id: user._id,
        token
      })
    } catch (error) {
      console.log(error)
      return badRequest(error)
    }
  }
}
