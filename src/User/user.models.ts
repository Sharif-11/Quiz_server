import mongoose, { Schema } from 'mongoose'
import { IUser } from './user.types'

const UserSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: {
      virtuals: true, // Ensure virtual fields are included in JSON output
      transform: function (doc, ret) {
        ret.id = ret._id // Include id field from _id
        delete ret._id // Exclude _id field from JSON output
        delete ret.__v // Exclude __v field from JSON output
        delete ret.password // Exclude password field from JSON output
        delete ret.$__ // Remove Mongoose internal state
        delete ret.$isNew // Remove isNew flag
        delete ret._doc // Remove internal _doc field
        delete ret.saving // Remove saving state
        delete ret.validating // Remove validating state
      },
    },
  },
)

// Create the Mongoose model
const User = mongoose.model<IUser>('User', UserSchema)

export default User
