import { play, start } from "./game.js";
export const WIDTH = 20;
export const HEIGHT = 20;
export const DENSITY = 0.1; // 10% de bombes
export const BOMB = '<span class="icon material-symbols-outlined">bomb</span>';
export const BOMBS = [];
export const HITS = [];
export const CELLS = [];
// Dessin de la grille 
export function draw_grid() {
    // Création d'une grille à l'aide de listes imbriquées
    const htmlMain = document.getElementById("ground"); // attribut l'élément qui à l'id "ground" dans la const 'htmlMain'
    const htmlGrid = document.createElement("ul"); // créer l'élément 'ul' et l'ajoute dans la const 'htmlGrid'
    htmlGrid.className = "ground_grid"; // attribut une class à htmlGrid
    for (let y = 0; y < HEIGHT; y++) {
        BOMBS.push([]);
        HITS.push([]);
        CELLS.push([]);
        // Dessin d'une ligne
        const htmlRow = document.createElement("li");
        const htmlCells = document.createElement("ul");
        htmlRow.className = "ground_row";
        htmlRow.appendChild(htmlCells); // appendChild ajoute l'élément htmlCells en tant que dernier enfant de htmlRow
        htmlGrid.appendChild(htmlRow); // idem
        for (let x = 0; x < WIDTH; x++) {
            const bomb = Math.random() < DENSITY;
            BOMBS[y].push(bomb);
            HITS[y].push(false);
            // Dessin d'une cellule
            const htmlCell = document.createElement("li"); // créer element li dans const htmlCell
            htmlCell.classList.add("ground_cell", "mask"); // attribut des class à htmlCell grâce à classListe.add()
            htmlCell.innerHTML = bomb ? BOMB : "";
            htmlCell.onclick = () => play(x, y);
            htmlCells.appendChild(htmlCell);
            CELLS[y].push(htmlCell);
        }
    }
    // Insertion du tableau dans la page
    htmlMain.appendChild(htmlGrid);
    start();
}
