import { User } from 'src/database/entities/user.entity'
import { Note } from '../database/entities/note.entity'

export class NoteService {
  async createNote(title: string, content: string, userId: number): Promise<Note> {
    const user = await User.findOneBy({ id: userId })
    if (!user) {
      throw new Error('User not found')
    }
    const note = Note.create({ title, content })
    note.user = user
    await note.save()
    return note
  }

  async getAllNotes(): Promise<Note[]> {
    return Note.find({ relations: ['user'] })
  }

  async getNoteById(id: number): Promise<Note | null> {
    return Note.findOneBy({ id })
  }

  async updateNote(
    id: number,
    title: string,
    content: string,
    userId: number,
  ): Promise<Note | null> {
    const note = await Note.findOneBy({ id })
    if (!note) return null
    note.title = title
    note.content = content
    await note.save()
    return note
  }

  async deleteNote(id: number): Promise<boolean> {
    const result = await Note.delete({ id })
    return result.affected !== 0
  }
}
