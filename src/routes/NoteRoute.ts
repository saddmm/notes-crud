import { Router } from "express";
import noteController from "src/controllers/NoteController";

const router = Router();

router.get('/', noteController.getAllNotes)
router.get('/:id', noteController.getNoteById)
router.post('/', noteController.createNote)
router.put('/:id', noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

export default router;