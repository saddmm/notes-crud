import express from 'express'
import 'dotenv/config'
import AuthRoute from 'src/routes/UserRoute'
import NoteRoute from 'src/routes/NoteRoute'
import { AppDataSource } from './database/data-source'
import 'reflect-metadata'

const server = async () => {

  await AppDataSource.initialize()
  const app = express()
  const { PORT } = process.env
  
  app.use(express.json())
  app.use('/api/auth', AuthRoute)
  app.use('/api/notes', NoteRoute)
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

server()