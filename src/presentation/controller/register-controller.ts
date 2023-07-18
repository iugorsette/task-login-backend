import { Create, FindOne, User, UserSchema } from 'src/domain'
import { HashPassword, CreateToken } from 'src/infra'
import { badRequest, conflict, redirect } from '../helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class RegisterController implements Controller {
  constructor (
    protected readonly findUser: FindOne<User>,
    protected readonly createUser: Create<User>,
    protected readonly jwtAdapter: CreateToken,
    protected readonly bcrypt: HashPassword
  ) {}

  async handler ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const userValid: any = UserSchema.safeParse(body)

      if (!userValid.success) {
        const errorMessages = userValid.error.flatten().fieldErrors
        return badRequest(errorMessages)
      }
      const user = userValid.data

      this.checkEmptyFields(user)
      this.checkIfPasswordMatches(user)
      await this.checkUserExists(user)

      user.password = this.bcrypt.hash(user.password)

      const newUser = await this.createUser.create(user)

      const token = this.jwtAdapter.createToken(newUser)

      return redirect({
        message: 'Cadastro realizado com sucesso',
        token,
        userId: newUser._id
      })
    } catch (error) {
      if (error.message === 'As senhas não conferem') {
        return badRequest(error.message)
      }
      if (error.message === 'E-mail já cadastrado') {
        return conflict({ message: error.message })
      }
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
}
