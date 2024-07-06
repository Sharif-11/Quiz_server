import { body, param } from 'express-validator'

class AuthValidator {
  public registerValidation = [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 1, max: 48 })
      .withMessage('Name must be between 1 and 48 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6, max: 16 })
      .withMessage('Password must be between 6 and 16 characters'),
  ]

  public loginValidation = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6, max: 16 })
      .withMessage('Password must be between 6 and 16 characters'),
  ]

  public getUserByEmailValidation = [
    param('email').isEmail().withMessage('Invalid email'),
  ]
}

export default AuthValidator
