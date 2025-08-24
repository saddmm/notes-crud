import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const noteController = new NoteController()

router.get('/',  authMiddleware, noteController.getAllNotes)
router.get('/:id', noteController.getNoteById)
router.post('/', noteController.createNote)
router.put('/:id', noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

export default router;