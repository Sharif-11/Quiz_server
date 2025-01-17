/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connected successfully')
    app.listen(config.port, () => {
      console.log('app listening to port ', config.port)
    })
  } catch (error: any) {
    console.log('failed to connect data base' + error?.message)
  }
}
bootstrap()
