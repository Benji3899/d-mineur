import { Grid } from "./grid.js";
import { win, lose } from "./popup.js";

// let REMAINING = 0;
export class Game {
    private _remaining = 0;


// Démarrage du jeu
    start(grid: Grid) {
        this._remaining = grid.width * grid.height;  // largeur x hauteur 
        for (let x=0; x<grid.width; x++) // pour x=0 tant que x < à largeur de grille, ajoute 1 à x
            for (let y=0; y<grid.height; y++) // pour y=0 tant que y < à hauteur de grille, ajoute 1 à y
                if (grid.bombs[y][x]) // si 
                    this._remaining -= 1
}

// Gestion d'un clic sur une cellule
    play(grid: Grid, x: number, y: number) {
        if (grid.hits[y][x]) 
            return;

        const cell = grid.cells[y][x]; // const cell stock la cellule toucher à la position (x, y)
        cell.classList.remove("mask"); // supprime la class mask (donc désactive le css qui était lié)
        grid.hits[y][x] = true; // HIT a une interaction réussie à la position (x, y)
        if (grid.bombs[y][x]) {
            lose(); // si bombe détecté à l'emplacement x, y : retourne défaite
        } else {
            let n = Game.risk(grid, x, y); 
            let hint = n>=1 ? `${n}` : ""; // hint représente le nombres de bombes adjacentes. Si 'n' est >= 1, la chaîne est définie comme réprésentation textuelle de 'n', sinon elle est laissée vide.
            grid.cells[y][x].innerHTML = hint; // met à jour le contenu HTML 
            this._remaining -= 1;
            if (this._remaining == 0) {
                win();
                return;
            }
            if (n == 0)
            Game.explore(grid, x, y, (xi, yi) => this.play(grid, xi, yi));
        }
    }


// Gestion d'un clic sur une cellule
    private static risk(grid: Grid, column: number, line: number): number {
        let n = 0;
        Game.explore(grid, column, line, (x, y) => {
            if (grid.bombs[y][x])
                n += 1;
        });
        return n;
    }

// Explore le voisinage d'une cellule
    private static explore(grid: Grid, column: number, line: number, visit: (x: number, y: number) => void){
        const xmin = Math.max(column-1, 0);
        const xmax = Math.min(column+1, grid.width-1);
        const ymin = Math.max(line-1, 0);
        const ymax = Math.min(line+1, grid.height-1);
        for (let x=xmin; x<=xmax; x++)
            for (let y=ymin; y<=ymax; y++)
                if (x != column || y != line)
                    visit(x, y);
    }
}