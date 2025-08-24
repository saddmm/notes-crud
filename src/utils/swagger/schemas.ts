/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: "johndoe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "My First Note"
 *         content:
 *           type: string
 *           example: "This is the content of my first note"
 *         user:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 *     
 *     RegisterUserDto:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           example: "johndoe"
 *           description: "Username must be at least 3 characters long"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *           description: "Must be a valid email address"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "password123"
 *           description: "Password must be at least 6 characters long"
 *     
 *     LoginUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 *           description: "Must be a valid email address"
 *         password:
 *           type: string
 *           example: "password123"
 *           description: "User password"
 *     
 *     CreateNoteDto:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 255
 *           example: "My Note Title"
 *           description: "Note title (max 255 characters)"
 *         content:
 *           type: string
 *           example: "This is the content of my note"
 *           description: "Note content"
 *     
 *     UpdateNoteDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 255
 *           example: "Updated Note Title"
 *           description: "Note title (max 255 characters) - optional"
 *         content:
 *           type: string
 *           example: "This is the updated content of my note"
 *           description: "Note content - optional"
 *     
 * 
 * tags:
 *   - name: Authentication
 *     description: User authentication endpoints
 *   - name: Users
 *     description: User management endpoints
 *   - name: Notes
 *     description: Note management endpoints
 */
