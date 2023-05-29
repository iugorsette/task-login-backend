import { UserRepoisitory, JwtAdapter, BcryptAdapter } from 'src/infra'
import { Controller, RegisterController } from 'src/presentation'

export const makeRegister = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new RegisterController(userRepoisitory, userRepoisitory, jwtAdapter, bcryptAdapter)
}
