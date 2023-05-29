import { UserRepoisitory, JwtAdapter, BcryptAdapter } from 'src/infra'
import { Controller, LoginController } from 'src/presentation'

export const makeLogin = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new LoginController(userRepoisitory, jwtAdapter, bcryptAdapter)
}
