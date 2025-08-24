import express from 'express'
import 'dotenv/config'
import AuthRoute from 'src/routes/user.route'
import NoteRoute from 'src/routes/note.route'
import { AppDataSource } from './database/data-source'
import 'reflect-metadata'


  const app = express()
  const { PORT } = process.env
  
  app.use(express.json())
  app.use('/api/auth', AuthRoute)
  app.use('/api/notes', NoteRoute)
  
  AppDataSource.initialize().then(() => {
    console.log('Database connected')
  }).catch((error: any) => {
    console.log('error: ', error)
  })
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
