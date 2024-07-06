import mongoose, { Schema } from 'mongoose'
import { IUser } from './user.types'
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
})

// Create the Mongoose model
const User = mongoose.model<IUser>('User', UserSchema)
export default User
