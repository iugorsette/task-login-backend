import { Create, FindOne, User } from 'src/domain'
import { badRequest, redirect } from '../helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'
import bcrypt from 'bcryptjs'
import { CreateToken } from 'src/domain/usecases/createToken'

export class RegisterController implements Controller {
  constructor (
    protected readonly findUser: FindOne<User>,
    protected readonly createUser: Create<User>,
    protected readonly jwtAdapter: CreateToken
  ) {}

  async handler ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const user: Required<User> = body

      this.checkEmptyFields(user)
      this.checkIfPasswordMatches(user)
      await this.checkUserExists(user)

      user.password = this.hashPassword(user.password)

      const newUser = await this.createUser.create(user)

      const token = this.jwtAdapter.createToken(newUser)

      return redirect({
        message: 'Cadastro realizado com sucesso',
        token,
        user: newUser._id
      })
    } catch (error) {
      return badRequest(error.message)
    }
  }

  private async checkUserExists ({ email }: User): Promise<void | HttpResponse> {
    const emailExists = await this.findUser.findOne({ email })
    if (emailExists) {
      throw new Error('E-mail já cadastrado')
    }
  }

  private checkEmptyFields ({
    name = '',
    email = '',
    password = '',
    confirmPassword = ''
  }: User): void | HttpResponse {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      throw new Error('Por favor preencha todos os campos')
    }
  }

  private checkIfPasswordMatches ({
    password,
    confirmPassword
  }: User): void | HttpResponse {
    if (password !== confirmPassword) {
      throw new Error('As senhas não conferem')
    }
  }

  private hashPassword (password: string): string {
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
  }
}
