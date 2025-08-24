import {Request} from 'express'

interface UserData {
  id: number
  email: string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserData
        }
    }
}