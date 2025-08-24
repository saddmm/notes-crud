import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateNoteDto, UpdateNoteDto } from "../dtos/note.dto";

const router = Router();
const noteController = new NoteController()

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     description: Retrieve all notes from all users (public endpoint)
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Successfully retrieved all notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *       400:
 *         description: Bad request
 */
router.get('/', noteController.getAllNotes)

/**
 * @swagger
 * /notes/my-notes:
 *   get:
 *     summary: Get current user's notes
 *     description: Retrieve all notes belonging to the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Bad request
 */
router.get('/my-notes', authMiddleware, noteController.getMyNotes)

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     description: Retrieve a specific note by its ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Successfully retrieved note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       400:
 *         description: Bad request - Invalid ID format
 */
router.get('/:id', noteController.getNoteById)

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     description: Create a new note for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteDto'
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Create note successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Bad request - Validation failed
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post('/', authMiddleware, validationMiddleware(CreateNoteDto), noteController.createNote)

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     description: Update an existing note owned by the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteDto'
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Update note successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 *       400:
 *         description: Bad request - Validation failed or invalid ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Note not found or not owned by user
 */
router.put('/:id', authMiddleware, validationMiddleware(UpdateNoteDto), noteController.updateNote)

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     description: Delete an existing note owned by the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The note ID
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Delete successfully"
 *       400:
 *         description: Bad request - Invalid ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Note not found or not owned by user
 */
router.delete('/:id', authMiddleware, noteController.deleteNote)

export default router;