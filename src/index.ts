import express from 'express'
import 'dotenv/config'
import UserRoute from './routes/user.route'
import NoteRoute from './routes/note.route'
import { AppDataSource } from './database/data-source'
import swaggerUi from 'swagger-ui-express'
import 'reflect-metadata'
import specs from './utils/swagger/config'

const app = express()
const { PORT } = process.env

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/api/users', UserRoute)
app.use('/api/notes', NoteRoute)

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(specs)
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')
  })
  .catch((error: any) => {
    console.log('error: ', error)
  })
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT || 3000}`)
})
