import cors from 'cors'
import express, { Application } from 'express'
import authRouter from './User/user.routes'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.get('/', (req, res) => {
  res.send('Welcome to backend')
})

export default app
