/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import UserService from './user.services'

class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService() // Instantiate the UserService
  }

  // POST /api/users/register
  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body

    try {
      const user = await this.userService.createUser(name, email, password)
      res.status(201).json({
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: user,
      }) // Send the created user object as JSON response
    } catch (error: any) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
      }) // Handle error response with status code and message
    }
  }

  // POST /api/users/register-admin
  public async registerAdmin(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body

    try {
      const admin = await this.userService.createAdmin(name, email, password)
      res.status(201).json({
        statusCode: 201,
        success: true,
        message: 'Admin created successfully',
        data: admin,
      }) // Send the created admin object as JSON response
    } catch (error: any) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        message: error.message,
      }) // Handle error response with status code and message
    }
  }

  // POST /api/users/login
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const { token, ...userWithoutToken } = await this.userService.userLogin(
        email,
        password,
      )
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: { token, user: userWithoutToken },
      }) // Send token and user object without password as JSON response
    } catch (error: any) {
      res.status(401).json({
        statusCode: 401,
        success: false,
        message: error.message,
      }) // Handle error response with status code and message
    }
  }

  // GET /api/users/:email
  public async getUserByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params

    try {
      const user = await this.userService.getUserByEmail(email)
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: user,
      }) // Send user object as JSON response
    } catch (error: any) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: error.message,
      }) // Handle error response with status code and message
    }
  }
}

export default UserController
