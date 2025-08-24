import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface UserData {
  id: number
  email: string
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1]
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as UserData
    next()
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" })
  }
}
