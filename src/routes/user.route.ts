import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { validationMiddleware } from '../middleware/validation.middleware'
import { RegisterUserDto, LoginUserDto } from '../dtos/user.dto'

const router = Router()
const userController = new UserController()

router.post('/register', validationMiddleware(RegisterUserDto), userController.register)
router.post('/login', validationMiddleware(LoginUserDto), userController.login)
router.get('/me', authMiddleware, userController.getProfile)

export default router
