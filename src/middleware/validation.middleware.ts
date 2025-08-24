import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

export function validationMiddleware<T>(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(type, req.body)
    validate(dto).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const firstError = errors[0]
        const constraints = firstError?.constraints || {}
        const firstErrorMessage = Object.values(constraints)[0] || 'Validation failed'

        return res.status(400).json({
          success: false,
          message: firstErrorMessage,
        })
      } else {
        req.body = dto
        next()
      }
    }).catch((error) => {
      return res.status(500).json({
        success: false,
        message: 'Validation error',
        error: error.message
      })
    })
  }
}
