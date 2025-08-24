import { User } from '../database/entities/user.entity'
import { Note } from '../database/entities/note.entity'

export class NoteService {
  createNote = async (title: string, content: string, userId: number): Promise<Note> => {
    const user = await User.findOneBy({ id: userId })
    if (!user) {
      throw new Error('User not found')
    }
    const note = Note.create({ title, content, user })
    await note.save()
    return note
  }

  getAllNotes = async (): Promise<Note[]> => {
    return Note.find({ relations: ['user'] })
  }

  getAllNotesByUser = async (userId: number): Promise<Note[]> => {
    return Note.find({ where: { user: { id: userId } } })
  }

  getNoteById = async (id: number): Promise<Note | null> => {
    return Note.findOne({ where: { id }, relations: ['user'] })
  }

  getNoteByIdByUser = async (id: number, userId: number): Promise<Note | null> => {
    return Note.findOneBy({ id, user: { id: userId } })
  }

  updateNote = async (
    id: number,
    title: string,
    content: string,
    userId: number,
  ): Promise<Note | null> => {
    const note = await this.getNoteById(id)
    if (!note) {
      throw new Error('Note not found')
    }
    if (note?.user.id !== userId) {
      throw new Error('You are not authorized to update this note')
    }
    if (title) note.title = title
    if (content) note.content = content
    await note.save()
    return note
  }

  deleteNote = async (id: number, userId: number): Promise<boolean> => {
    const note = await this.getNoteById(id)
    if (!note) {
      throw new Error('Note not found')
    }
    if (note?.user.id !== userId) {
      throw new Error('You are not authorized to delete this note')
    }
    const result = await Note.delete({ id, user: { id: userId } })
    return result.affected !== 0
  }
}
