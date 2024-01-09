export class Cell {
    readonly x: number;
    readonly y: number;
    readonly bomb: boolean;
    hit = false;

    // Création d'une grille
    constructor(x: number, y: number, bomb: boolean) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }
}