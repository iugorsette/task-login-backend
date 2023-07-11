import { sign, verify } from 'jsonwebtoken'
import { User, env } from 'src/domain'
import { CreateToken } from '../protocols'
import { ReadToken } from '../protocols/read-token'

export class JwtAdapter implements CreateToken, ReadToken {
  createToken (user: User): string {
    const token = sign(
      {
        name: user.name,
        id: user._id
      },
      env.JWT_SECRET
    )
    return token
  }

  readToken (token: string): any {
    try {
      const decoded = verify(token, env.JWT_SECRET)
      return decoded
    } catch (error) {
      throw new Error('Token inválido')
    }
  }
}
