
import { UserRepoisitory } from 'src/infra'
import { JwtAdapter } from 'src/infra/Crypto/jwt'
import { Controller, LoginController } from 'src/presentation'

export const makeLogin = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  const jwtAdapter = new JwtAdapter()
  return new LoginController(userRepoisitory, jwtAdapter)
}
