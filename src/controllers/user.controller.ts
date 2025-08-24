import { UserService } from '../services/user.service'
import { Request, Response } from 'express'

export class AuthController {
  private userService = new UserService()

  register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
      const user = await this.userService.register(username, email, password)
      return res.status(201).json({
        success: true,
        message: 'Register Successfully',
        data: user
      })
    } catch (error: any) {
      return res.status(400).json({ 
        success: false,
        message: error.message })
    }
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
      const payload = await this.userService.login(email, password)
      return res.status(200).json({
        success: true,
        data: payload.payload,
        token: payload.token,
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  }

  getProfile = async (req: Request, res: Response) => {
    try {
      const user = this.userService.me(req.user.id)
      return res.status(200).json({
        success: true,
        message: 'Successfully get user',
        data: user,
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  }
}
