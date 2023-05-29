
import { UserRepoisitory, JwtAdapter } from 'src/infra'
import { Controller, RegisterController } from 'src/presentation'

export const makeRegister = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  const jwtAdapter = new JwtAdapter()
  return new RegisterController(userRepoisitory, userRepoisitory, jwtAdapter)
}
