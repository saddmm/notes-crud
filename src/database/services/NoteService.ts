import { Note } from "../entities/NoteEntity";

export class NoteService {
  async createNote(title: string, content: string): Promise<Note> {
    const note = Note.create({ title, content });
    await note.save();
    return note;
  }

  async getAllNotes(): Promise<Note[]> {
    return Note.find();
  }

  async getNoteById(id: number): Promise<Note | null> {
    return Note.findOneBy({ id });
  }

  async updateNote(id: number, title: string, content: string): Promise<Note | null> {
    const note = await Note.findOneBy({ id });
    if (!note) return null;
    note.title = title;
    note.content = content;
    await note.save();
    return note;
  }

  async deleteNote(id: number): Promise<boolean> {
    const result = await Note.delete({ id });
    return result.affected !== 0;
  }
}
