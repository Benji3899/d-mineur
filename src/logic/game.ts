import { Grid } from "./entities/grid.js";
import { win, lose } from "../popup.js";
import { GridView } from "../ui/grid.view.js";
import { Cell } from "./entities/cell.js";
import { IGridView } from "../interfaces/i-grid-view.js";

// let REMAINING = 0;
export class Game {
  // private _remaining = 0;
  // private _grid: Grid;

  // constructor(grid: Grid){
  //     this._grid = grid;
  // }

  // Démarrage du jeu
  // Ne fait rien pour l'instant, mais ça deviendra utile
  // ex : démarrer un timer, initialiser un score, etc.
  start() {}

  // Gestion d'un clic sur une cellule
  play(view: IGridView, cell: Cell) {
    if (cell.hit) return;

    cell.hit = true; // supprime la class mask (donc désactive le css qui était lié)
    view.show(cell);
    if (cell.bomb) {
      lose(); // si bombe détecté à l'emplacement x, y : retourne défaite
    } else {
      let n = cell.risk;
      let hint = n >= 1 ? `${n}` : ""; // hint représente le nombres de bombes adjacentes. Si 'n' est >= 1, la chaîne est définie comme réprésentation textuelle de 'n', sinon elle est laissée vide.
      view.help(cell, hint);
      let grid = cell.grid;
      if (grid.remaining == 0) {
        win();
        return;
      }
      if (n == 0) grid.explore(cell, (near) => this.play(view, near));
    }
  }
}
