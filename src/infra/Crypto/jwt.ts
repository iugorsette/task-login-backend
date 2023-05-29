import jwt from 'jsonwebtoken'
import { User } from 'src/domain'

export class JwtAdapter {
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
