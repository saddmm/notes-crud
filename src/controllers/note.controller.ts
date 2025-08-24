import { NoteService } from '../services/note.service'
import { Request, Response } from 'express'

export class NoteController {
  private noteService = new NoteService()

  createNote = async (req: Request, res: Response) => {
    const { title, content } = req.body
    try {
      const note = await this.noteService.createNote(title, content, req.user!.id)
      return res.status(201).json({
        success: true,
        message: 'Create note successfully',
        data: note,
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  }

  getAllNotes = async (req: Request, res: Response) => {
    try {
      const notes = await this.noteService.getAllNotes()
      return res.status(200).json({
        success: true,
        message: 'Successfully',
        data: notes,
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  getMyNotes = async (req: Request, res: Response) => {
    const userId = req.user!.id
    try {
      const notes = await this.noteService.getAllNotesByUser(userId)
      return res.status(200).json({
        success: true,
        message: 'Successfully',
        data: notes,
      })
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  }

  getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params
    const note = await this.noteService.getNoteById(Number(id))
    if (!note)
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      })
    return res.status(200).json({
      success: true,
      message: 'Successfully',
      data: note,
    })
  }

  updateNote = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, content } = req.body
    const userId = req.user!.id
    try {
      const note = await this.noteService.updateNote(Number(id), title, content, userId)
      return res.status(200).json({
        success: true,
        message: 'Update note successfully',
        data: note,
      })
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      })
    }
  }

  deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user!.id
    const deleted = await this.noteService.deleteNote(Number(id), userId)
    if (!deleted)
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      })
    return res.status(204).json({
      success: true,
      message: 'Delete successfully',
    })
  }
}
