import { User } from '../../domain/protocols'

export interface CreateToken {
  createToken: (user: User) => string
}
