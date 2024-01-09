import { Grid } from "./grid";

export class Cell {
    readonly grid: Grid;
    readonly x: number;
    readonly y: number;
    readonly bomb: boolean;
    hit = false;

    // Création d'une grille
    constructor(grid: Grid, x: number, y: number, bomb: boolean) {
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }

    // Gestion d'un clic sur une cellule
    get risk(): number {
        let n = 0;
        this.grid.explore(this, (near) => {
            if (near.bomb)
                n += 1;
        });
        return n;
    }
}