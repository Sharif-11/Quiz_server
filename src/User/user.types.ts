export type IUser = {
  name: string
  email: string
  role: 'user' | 'admin'
  password: string
}
