
import { UserRepoisitory } from 'src/infra'
import { JwtAdapter } from 'src/infra/Crypto/jwt'
import { Controller, RegisterController } from 'src/presentation'

export const makeRegister = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  const jwtAdapter = new JwtAdapter()
  return new RegisterController(userRepoisitory, jwtAdapter)
}
