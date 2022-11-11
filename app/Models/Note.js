import { generateId } from "../Utils/generateId.js";

export class Note {
  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.type = data.type
    this.color = data.color
    this.date = data.date ? new Date(data.date) : new Date()
  }

  get ListTemplate() {
    return `
      <div class="col-4 bg-secondary elevation-2 my-3">
        <div class="row">
          <div class="col-12 p-2 selectable" onclick="app.casesController.setActive('${this.id}')">
            <div class="row">
              <div class="col-3">${this.ComputeTitle}</div>
              <div class="col-2">${this.type}</div>
              <div class="col-3">${this.ComputerDate}</div>
            </div>
         </div>
        </div>
      </div>
      `
  }

  inline style = "color"

  get ComputeTitle() {
    if (this.title) {
      return this.title.slice(0, 10) + '...'
    } else {
      return 'no title'
    }
  }

  get ComputerDate() {
    let date = this.date
    return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear()
  }

  get ComputeFullDate() {
    return this.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
  }
}