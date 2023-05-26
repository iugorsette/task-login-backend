
import { User } from 'src/domain'
import { badRequest, redirect } from '../helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class RegisterController implements Controller {
  constructor (protected readonly user: any) {}
  async handler ({ body }: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, confirmPassword }: User = body
    // console.log('name: ', name)
    // console.log('email: ', email)
    // console.log('password: ', password, ' | ', confirmPassword, ' | ', password === confirmPassword)
    if (
      name == null ||
          email == null ||
          password == null ||
          confirmPassword == null
    ) {
      return badRequest('Por favor preencha todos os campos')
    }

    // check if password matches confirmation
    if (password !== confirmPassword) {
      return badRequest('As senhas não conferem')
    }

    // check if email is already taken
    const emailExists = await this.user.findOne({ email })
    if (emailExists) {
      return badRequest('E-mail já cadastrado')
    }

    // hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const newUser = await this.user.create({
      name,
      email,
      password: hashedPassword
    })
    console.log('newUser: ', newUser)
    try {
      const token = jwt.sign(
        {
          name: newUser.name,
          id: newUser._id
        },
        process.env.JWT_SECRET
      )

      return redirect({ message: 'Cadastro realizado com sucesso', token, user: newUser._id })
    } catch (error) {
      badRequest(error)
    }
  }
}
