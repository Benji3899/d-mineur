export class Cell {
    // Création d'une grille
    constructor(x, y, bomb) {
        this.hit = false;
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }
}
