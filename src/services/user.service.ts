import { User } from '../database/entities/user.entity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface responLogin {
  payload: {
    id: number
    email: string
  }
  token: string
}

export class UserService {
  register = async (username: string, email: string, password: string): Promise<User> => {
    const existingUser = await User.findOneBy({ email })
    if (existingUser) {
      throw new Error('Email already in use')
    }
    const user = User.create({ username, email, password })
    await user.save()
    return user
  }

  login = async (email: string, password: string): Promise<responLogin> => {
    const user = await User.findOneBy({ email })
    if (!user) {
      throw new Error('Invalid email')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid password')
    }

    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })
    return { payload, token }
  }

  me = async (id: number): Promise<User | null> => {
    const user = await User.findOne({ where: { id }, relations: ['notes'] })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
