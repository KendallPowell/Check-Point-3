import { appState } from "../AppState.js"
import { noteService } from "../Services/NotesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"



function _drawNotes() {
  let notes = appState.notes
  let length = appState.notes.length
  let template = ''
  notes.sort((a, b) => b.updatedTime - a.updatedTime)
  notes.forEach(n => template += n.ListTemplate)
  setHTML('note-list', template)
  setText('total-notes', length)
}

function _drawActiveNote() {
  let activeNote = appState.activeNote
  // console.log('drawing active', activeNote)
  setHTML('active-note', activeNote.ActiveTemplate)
}


export class NotesController {
  constructor() {
    // console.log('controller is working')
    appState.on('notes', _drawNotes)
    appState.on('activeNote', _drawActiveNote)
    _drawNotes()
    console.log(appState.notes.length)
    setInterval(() => {
      if (appState.activeNote) {
        this.saveNote()
      }
    }, 3000)

  }

  createNotes() {
    window.event.preventDefault()
    const form = window.event.target
    let noteData = getFormData(form)
    // console.log(noteData)
    noteService.createNotes(noteData)
    form.reset()
  }

  setActive(id) {
    // console.log('setting active', id)
    noteService.setActive(id)
  }

  saveNote() {
    let newContent = document.querySelector('.content')
    noteService.saveNote(newContent.value)
  }

  async removeNote(id) {
    if (await Pop.confirm('Godzilla gonna eat that Note')) {
      let audioElm = document.getElementById("audioEffect")
      audioElm.play()
      audioElm.volume = 0.3
      noteService.removeNote(id)
    }
  }
}

