import { NotesController } from "./Controllers/NotesController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();
  notesController = new NotesController()
}

window["app"] = new App();
