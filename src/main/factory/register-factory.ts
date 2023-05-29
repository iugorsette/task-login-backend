import { UserRepository, JwtAdapter, BcryptAdapter } from 'src/infra'
import { Controller, RegisterController } from 'src/presentation'

export const makeRegister = (): Controller => {
  const userRepository = new UserRepository()
  const jwtAdapter = new JwtAdapter()
  const bcryptAdapter = new BcryptAdapter()
  return new RegisterController(userRepository, userRepository, jwtAdapter, bcryptAdapter)
}
