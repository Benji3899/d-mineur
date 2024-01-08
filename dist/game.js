import { win, lose } from "./popup.js";
let REMAINING = 0;
// Démarrage du jeu
export function start(grid) {
    REMAINING = grid.WIDTH * grid.HEIGHT;
    for (let x = 0; x < grid.WIDTH; x++)
        for (let y = 0; y < grid.HEIGHT; y++)
            if (grid.BOMBS[y][x])
                REMAINING -= 1;
}
// Gestion d'un clic sur une cellule
export function play(grid, x, y) {
    if (grid.HITS[y][x])
        return;
    const cell = grid.CELLS[y][x]; // cellule située à la position (x, y) dans la grille
    cell.classList.remove("mask"); // supprime la class mask (donc désactive le css qui était lié)
    grid.HITS[y][x] = true; // HIT a une interaction réussie à la position (x, y)
    if (grid.BOMBS[y][x]) {
        lose();
    }
    else {
        let n = risk(grid, x, y);
        let hint = n >= 1 ? `${n}` : ""; // hint représente le nombres de bombes adjacentes. Si 'n' est >= 1, la chaîne est définie comme réprésentation textuelle de 'n', sinon elle est laissée vide.
        grid.CELLS[y][x].innerHTML = hint; // met à jour le contenu HTML 
        REMAINING -= 1;
        if (REMAINING == 0) {
            win();
            return;
        }
        if (n == 0)
            explore(grid, x, y, (xi, yi) => play(grid, xi, yi));
    }
}
// Gestion d'un clic sur une cellule
export function risk(grid, column, line) {
    let n = 0;
    explore(grid, column, line, (x, y) => {
        if (grid.BOMBS[y][x])
            n += 1;
    });
    return n;
}
// Explore le voisinage d'une cellule
export function explore(grid, column, line, visit) {
    const xmin = Math.max(column - 1, 0);
    const xmax = Math.min(column + 1, grid.WIDTH - 1);
    const ymin = Math.max(line - 1, 0);
    const ymax = Math.min(line + 1, grid.HEIGHT - 1);
    for (let x = xmin; x <= xmax; x++)
        for (let y = ymin; y <= ymax; y++)
            if (x != column || y != line)
                visit(x, y);
}
