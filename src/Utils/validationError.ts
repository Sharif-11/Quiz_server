import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
class ValidationMiddleware {
  public handleValidationErrors(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        statusCode: 400,
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      })
    } else {
      next()
    }
  }
}
export default ValidationMiddleware
