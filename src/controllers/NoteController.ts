import { NoteService } from "src/database/services/NoteService";
import { Request, Response } from "express";

class NoteController {
  constructor(private noteService: NoteService) {}

  async createNote(req: Request, res: Response) {
    const { title, content } = req.body;
    const note = await this.noteService.createNote(title, content);
    return res.status(201).json(note);
  }

  async getAllNotes(req: Request, res: Response) {
    const notes = await this.noteService.getAllNotes();
    return res.status(200).json(notes);
  }

  async getNoteById(req: Request, res: Response) {
    const { id } = req.params;
    const note = await this.noteService.getNoteById(Number(id));
    if (!note) return res.status(404).json({ message: "Note not found" });
    return res.status(200).json(note);
  }

  async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await this.noteService.updateNote(Number(id), title, content);
    if (!note) return res.status(404).json({ message: "Note not found" });
    return res.status(200).json(note);
  }

  async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await this.noteService.deleteNote(Number(id));
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    return res.status(204).send();
  }
}

export default new NoteController(new NoteService());