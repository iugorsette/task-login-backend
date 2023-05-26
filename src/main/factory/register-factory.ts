
import { UserRepoisitory } from 'src/infra'
import { Controller, RegisterController } from 'src/presentation'

export const makeRegister = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  return new RegisterController(userRepoisitory)
}
