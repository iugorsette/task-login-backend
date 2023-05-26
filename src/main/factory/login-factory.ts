
import { UserRepoisitory } from 'src/infra'
import { Controller, LoginController } from 'src/presentation'

export const makeLogin = (): Controller => {
  const userRepoisitory = new UserRepoisitory()
  return new LoginController(userRepoisitory)
}
