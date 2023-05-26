
import { User } from 'src/domain'
import { badRequest, redirect } from '../helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class RegisterController implements Controller {
  constructor (protected readonly user: any) {}

  async handler ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const user: Required<User> = body

      this.checkEmptyFields(user)
      this.checkIfPasswordMatches(user)
      await this.checkUserExists(user)

      user.password = this.hashPassword(user.password)

      const newUser = await this.user.create(user)

      const token = this.createToken(newUser)

      return redirect({ message: 'Cadastro realizado com sucesso', token, user: newUser._id })
    } catch (error) {
      return badRequest(error.message)
    }
  }

  private async checkUserExists ({ email }: User): Promise<void | HttpResponse> {
    const emailExists = await this.user.findOne({ email })
    if (emailExists) {
      throw new Error('E-mail já cadastrado')
    }
  }

  private checkEmptyFields ({ name, email, password, confirmPassword }: User): void | HttpResponse {
    if (
      name == null ||
          email == null ||
          password == null ||
          confirmPassword == null
    ) {
      throw new Error('Por favor preencha todos os campos')
    }
  }

  private checkIfPasswordMatches ({ password, confirmPassword }: User): void | HttpResponse {
    if (password !== confirmPassword) {
      throw new Error('As senhas não conferem')
    }
  }

  private hashPassword (password: string): string {
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
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
