import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes CRUD API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing notes with user authentication',
      contact: {
        name: 'API Support',
        email: 'support@notes-api.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>'
        }
      }
    }
  },
  apis: [
    './src/routes/*.ts',
    './src/utils/swagger/*.ts',
    './src/dto/*.ts'
  ]
}

const specs = swaggerJsdoc(options)

export default specs
