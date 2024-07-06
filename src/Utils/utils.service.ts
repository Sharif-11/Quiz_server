import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
class AuthUtils {
  // Encrypt a password using bcrypt
  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, Number(config.salt_round))
  }

  // Compare a plain password with a hashed password
  public static async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }

  // Generate a JWT token
  public static generateToken(
    payload: object,
    expiresIn: string = '7d',
  ): string {
    return jwt.sign(payload, config.jwt_secret as string, { expiresIn })
  }

  // Verify a JWT token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.jwt_secret as string)
    } catch (error) {
      throw new Error('Invalid or expired token')
    }
  }
}

export default AuthUtils
