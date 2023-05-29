import jwt from 'jsonwebtoken'
import { User } from 'src/domain'
import { CreateToken } from '../protocols'

export class JwtAdapter implements CreateToken {
  createToken (user: User): string {
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id
      },
      process.env.JWT_SECRET
    )
    return token
  }
}
