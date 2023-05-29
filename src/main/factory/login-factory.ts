import { UserRepository, JwtAdapter, BcryptAdapter } from 'src/infra'
import { Controller, LoginController } from 'src/presentation'

export const makeLogin = (): Controller => {
  const userRepository = new UserRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new LoginController(userRepository, jwtAdapter, bcryptAdapter)
}
