import { appState } from "../AppState.js"
import { noteService } from "../Services/NotesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"


function _drawNotes() {
  let notes = appState.notes
  let template = ''
  notes.forEach(n => template += n.ListTemplate)
  setHTML('note-list', template)
}

function _drawActiveNote() {
  let activeNote = appState.activeNote
  console.log('drawing active', activeNote)
  setHTML('active-note', activeNote.ActiveTemplate)
}


export class NotesController {
  constructor() {
    console.log('controller is working')
    appState.on('notes', _drawNotes)
    appState.on('activeNote', _drawActiveNote)
    _drawNotes()

  }

  createNotes() {
    window.event.preventDefault()
    const form = window.event.target
    let noteData = getFormData(form)
    console.log(noteData)
    noteService.createNotes(noteData)
    form.reset()
  }

  setActive(id) {
    console.log('setting active', id)
    noteService.setActive(id)
  }

  saveNote() {
    let newContent = document.querySelector('content')
    noteService.saveNote(newContent, '')
  }

  async removeNote(id) {
    if (await Pop.confirm('Godzilla gonna eat that Note')) {
      noteService.removeNote(id)
    }
  }
}