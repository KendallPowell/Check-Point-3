import { noteService } from "../Services/NotesService.js"
import { getFormData } from "../Utils/FormHandler.js"




export class NotesController {
  constructor() {
    console.log('Controller is working')
  }

  createNotes() {
    window.event.preventDefault()
    const form = window.event.target
    let noteData = getFormData(form)
    console.log(noteData)
    noteService.createNotes(noteData)
    form.remove()
  }
}