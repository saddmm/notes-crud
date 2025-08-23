import { AuthService } from "src/database/services/AuthService"
import { Request, Response } from "express"


class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body
    try {
      const user = await this.authService.register(username, email, password)
      res.status(201).json(user)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const token = await this.authService.login(email, password)
      res.status(200).json({ token })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default new AuthController(new AuthService());