export class Cell {
    // Création d'une grille
    constructor(grid, x, y, bomb) {
        this.hit = false;
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.bomb = bomb;
    }
    // Gestion d'un clic sur une cellule
    get risk() {
        let n = 0;
        this.grid.explore(this, (near) => {
            if (near.bomb)
                n += 1;
        });
        return n;
    }
}
