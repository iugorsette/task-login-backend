import jwt from 'jsonwebtoken'
import { User, env } from 'src/domain'
import { CreateToken } from '../protocols'

export class JwtAdapter implements CreateToken {
  createToken (user: User): string {
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id
      },
      env.JWT_SECRET
    )
    return token
  }
}
