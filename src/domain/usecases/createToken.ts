import { User } from '../protocols'

export interface CreateToken {
  createToken: (user: User) => string
}
