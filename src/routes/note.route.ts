import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateNoteDto, UpdateNoteDto } from "../dtos/note.dto";

const router = Router();
const noteController = new NoteController()

router.get('/', noteController.getAllNotes)
router.get('/my-notes', authMiddleware, noteController.getMyNotes)
router.get('/:id', noteController.getNoteById)
router.post('/', authMiddleware, validationMiddleware(CreateNoteDto), noteController.createNote)
router.put('/:id', authMiddleware, validationMiddleware(UpdateNoteDto, true), noteController.updateNote)
router.delete('/:id', authMiddleware, noteController.deleteNote)

export default router;