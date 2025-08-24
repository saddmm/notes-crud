import { Router } from 'express'
import { AuthController } from '../controllers/user.controller'

const router = Router()
const authController = new AuthController()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', )

export default router
