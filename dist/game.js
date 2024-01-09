import { win, lose } from "./popup.js";
// let REMAINING = 0;
export class Game {
    constructor() {
        this.REMAINING = 0;
    }
    // Démarrage du jeu
    start(grid) {
        this.REMAINING = grid.WIDTH * grid.HEIGHT; // largeur x hauteur 
        for (let x = 0; x < grid.WIDTH; x++) // pour x=0 tant que x < à largeur de grille, ajoute 1 à x
            for (let y = 0; y < grid.HEIGHT; y++) // pour y=0 tant que y < à hauteur de grille, ajoute 1 à y
                if (grid.BOMBS[y][x]) // si 
                    this.REMAINING -= 1;
    }
    // Gestion d'un clic sur une cellule
    play(grid, x, y) {
        if (grid.HITS[y][x])
            return;
        const cell = grid.CELLS[y][x]; // const cell stock la cellule toucher à la position (x, y)
        cell.classList.remove("mask"); // supprime la class mask (donc désactive le css qui était lié)
        grid.HITS[y][x] = true; // HIT a une interaction réussie à la position (x, y)
        if (grid.BOMBS[y][x]) {
            lose(); // si bombe détecté à l'emplacement x, y : retourne défaite
        }
        else {
            let n = Game.risk(grid, x, y);
            let hint = n >= 1 ? `${n}` : ""; // hint représente le nombres de bombes adjacentes. Si 'n' est >= 1, la chaîne est définie comme réprésentation textuelle de 'n', sinon elle est laissée vide.
            grid.CELLS[y][x].innerHTML = hint; // met à jour le contenu HTML 
            this.REMAINING -= 1;
            if (this.REMAINING == 0) {
                win();
                return;
            }
            if (n == 0)
                Game.explore(grid, x, y, (xi, yi) => this.play(grid, xi, yi));
        }
    }
    // Gestion d'un clic sur une cellule
    static risk(grid, column, line) {
        let n = 0;
        Game.explore(grid, column, line, (x, y) => {
            if (grid.BOMBS[y][x])
                n += 1;
        });
        return n;
    }
    // Explore le voisinage d'une cellule
    static explore(grid, column, line, visit) {
        const xmin = Math.max(column - 1, 0);
        const xmax = Math.min(column + 1, grid.WIDTH - 1);
        const ymin = Math.max(line - 1, 0);
        const ymax = Math.min(line + 1, grid.HEIGHT - 1);
        for (let x = xmin; x <= xmax; x++)
            for (let y = ymin; y <= ymax; y++)
                if (x != column || y != line)
                    visit(x, y);
    }
}
