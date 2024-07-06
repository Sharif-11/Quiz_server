import express from 'express'
import UserController from './user.controller'
import AuthValidator from './user.validator'

const authRouter = express.Router()
const authValidator = new AuthValidator()
const userController = new UserController()
// POST /api/users/register
authRouter.post(
  '/register',
  authValidator.registerValidation,
  userController.register,
)

// POST /api/users/register-admin
authRouter.post(
  '/register-admin',
  authValidator.registerValidation,
  userController.registerAdmin,
)

// POST /api/users/login
authRouter.post('/login', authValidator.loginValidation, userController.login)

// GET /api/users/:email
authRouter.get(
  '/:email',
  authValidator.getUserByEmailValidation,
  userController.getUserByEmail,
)

export default authRouter
