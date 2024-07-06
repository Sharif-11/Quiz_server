import AuthUtils from '../Utils/utils.service'
import User from './user.models'
import { IUser } from './user.types'

class UserService {
  public async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    try {
      const hashedPassword = await AuthUtils.hashPassword(password)

      const user = await User.create({
        name,
        email,
        role: 'user',
        password: hashedPassword,
      })

      return user
    } catch (error) {
      throw new Error('User creation failed')
    }
  }

  public async createAdmin(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const existingAdmin = await User.findOne({ role: 'admin' })

    if (existingAdmin) {
      throw new Error('Admin already exist!')
    }
    const hashedPassword = await AuthUtils.hashPassword(password)
    try {
      const admin = await User.create({
        name,
        email,
        role: 'admin',
        password: hashedPassword,
      })
      return admin
    } catch (error) {
      throw new Error('Admin creation failed')
    }
  }

  public async userLogin(email: string, password: string) {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const isPasswordValid = await AuthUtils.comparePassword(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    const token = AuthUtils.generateToken({ userId: user._id, role: user.role })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return { ...userWithoutPassword, token }
  }
  public async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      throw new Error('Error retrieving user information')
    }
  }
}

export default UserService
