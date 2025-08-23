import { User } from '../entities/UserEntity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class AuthService {
  async register(username: string, email: string, password: string): Promise<User> {
    const existingUser = await User.findOneBy({ email })
    if (existingUser) {
      throw new Error('Email already in use')
    }
    const user = User.create({ username, email, password })
    await user.save()
    return user
  }

  async login(email: string, password: string): Promise<string> {
    const user = await User.findOneBy({ email })
    if (!user) {
      throw new Error('Invalid email or password')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    )
    return token
  }
}
