import { appState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

function _computeDate(date) {
  return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", time: "short" }) + " : " + date.toLocaleTimeString('en-us', { timeStyle: "medium" })
}

export class Note {
  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.type = data.type
    this.color = data.color
    this.date = data.date ? new Date(data.date) : new Date()
    this.updatedTime = data.updatedTime ? new Date(data.updatedTime) : new Date()
    this.content = data.content || ""
  }

  get ListTemplate() {
    return `
    <div class="col-10 bg-secondary elevation-2 my-3 m-1 rounded">
      <div class="row">
        <div class="col-12 selectable" onclick="app.notesController.setActive('${this.id}')">
          <div class="row justify-content-evenly p-2 text-center">
            <div style="color: ${this.color};" class="col">${this.ComputeTitle}</div>
            <div class="col">${_computeDate(this.updatedTime)}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-1 text-danger text-center fs-2 fw-bold text-end my-2 p-1">
      <button class="btn btn-danger"><i class="mdi mdi-delete-off-outline" onclick="app.notesController.removeNote('${this.id}')"></i></button>
    </div>
      `
  }

  get ActiveTemplate() {
    return `
    <div style="border-color:${this.color}!important" class="col-10 bg-secondary text-dark border border-2 shadow-lg">
      <div class="row">
        <div class="col-3 mt-2 text-bold">
          <div style="color: ${this.color}" class="my-2 p-1 fs-4 fw-bold">${this.title}</div>
          <div class="my-2 p-1">Type: ${this.type}</div>
          <div class="my-2 p-1">Created On: ${_computeDate(this.date)}</div>
          <div class="my-2 p-1">Updated On: ${_computeDate(this.updatedTime)}</div>
        </div>
        <textarea class="col-8 my-3 content shadow-lg" name="" id="" cols="30" rows="20" onblur="app.notesController.saveNote()">${this.content}</textarea>
      </div>
    </div>
    `
  }


  get ComputeTitle() {
    if (this.title) {
      return this.title.slice(0, 10) + '...'
    } else {
      return 'no title'
    }
  }

  get ComputeFullDate() {
    return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
  }
}
