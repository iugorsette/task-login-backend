import jwt from 'jsonwebtoken'

export class JwtAdapter {
  createToken (user: any): string {
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
