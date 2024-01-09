import { Grid } from "./grid.js";
import { win, lose } from "../popup.js";
import { GridView } from "../ui/grid.view.js";
import { Cell } from "./cell.js";

// let REMAINING = 0;
export class Game {
    private _remaining = 0;
    private _grid: Grid;

    constructor(grid: Grid){
        this._grid = grid;
    }

// Démarrage du jeu
    start() {
        // let w = this._grid.width;  // récupération largeur      
        // let h = this._grid.height; // récupération hauteur
        // this._remaining = w + h; //  largeur x hauteur
        // for (let x=0; w<w; x++) // pour x=0 tant que x < à largeur de grille, ajoute 1 à x
        //     for (let y=0; y<this._grid.height; y++) // pour y=0 tant que y < à hauteur de grille, ajoute 1 à y
        //         if (this._grid.cells[y][x].bomb) // si 
        //             this._remaining -= 1
}

// Gestion d'un clic sur une cellule
    play(view: GridView, cell: Cell) {
        if (cell.hit) 
            return;

        view.cells[cell.y][cell.x].classList.remove("mask"); // const cell stock la cellule toucher à la position (x, y)
        cell.hit = true; // supprime la class mask (donc désactive le css qui était lié)
        if (cell.bomb) {
            lose(); // si bombe détecté à l'emplacement x, y : retourne défaite
        } else {
            // let n = this.risk(cell); 
            let n = cell.risk;
            let hint = n>=1 ? `${n}` : ""; // hint représente le nombres de bombes adjacentes. Si 'n' est >= 1, la chaîne est définie comme réprésentation textuelle de 'n', sinon elle est laissée vide.
            view.cells[cell.y][cell.x].innerHTML = hint; // met à jour le contenu HTML 
            let grid = cell.grid;
            if (grid.remaining == 0) {
                win();
                return;
            }
            if (n == 0)
            grid.explore(cell, (near) => this.play(view, near));
        }
    }


// Gestion d'un clic sur une cellule
    private risk(cell: Cell): number {
        let n = 0;
        this._grid.explore(cell, (near) => {
            if (near.bomb)
                n += 1;
        });
        return n;
    }
}