import bcrypt from 'bcryptjs'
import { ComparePassword, HashPassword } from '../protocols'

export class BcryptAdapter implements ComparePassword, HashPassword {
  hash (password: string): string {
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
  }

  async compare (enteredPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, password)
  }
}
