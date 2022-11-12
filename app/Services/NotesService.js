import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { saveState } from "../Utils/Store.js"





class NotesService {

    createNotes(noteData) {
        console.log('note data in service', noteData)
        const newNote = new Note(noteData)
        appState.notes = [...appState.notes, newNote]
        appState.activeNote = newNote
        saveState('notes', appState.notes)
    }

    setActive(id) {
        console.log('set active service', id)
        const activeNote = appState.notes.find(n => n.id == id)
        appState.activeNote = activeNote
    }

    saveNote(newContent) {
        let activeNote = appState.activeNote
        activeNote.content = newContent
        appState.emit('activeNote')
        saveState('notes', appState.notes)
    }

    removeNote(id) {
        let filteredArray = appState.notes.filter(n => n.id != id)
        appState.notes = filteredArray
        saveState('notes', appState.notes)
    }
}


export const noteService = new NotesService()