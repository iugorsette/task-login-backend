
import { UserRepoisitory, JwtAdapter } from 'src/infra'
import { Controller, LoginController } from 'src/presentation'

export const makeLogin = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  const jwtAdapter = new JwtAdapter()
  return new LoginController(userRepoisitory, jwtAdapter)
}
