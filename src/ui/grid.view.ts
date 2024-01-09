import { IGridView } from "../interfaces/i-grid-view";
import { Cell } from "../logic/entities/cell";
import { Game } from "../logic/game";
import { Grid } from "../logic/entities/grid";

export class GridView implements IGridView{
    private static readonly BOMB = '<span class="icon material-symbols-outlined">bomb</span>';

    readonly grid: Grid;
    readonly cells : HTMLElement[][] = [];

    constructor(grid: Grid){
        this.grid = grid;
    }

    // Dessin de la grille
    draw(game: Game) {

        // Création d'une grille à l'aide de listes imbriquées
        const htmlMain = document.getElementById("ground")!; // attribut l'élément qui à l'id "ground" dans la const 'htmlMain'
        const htmlGrid = document.createElement("ul")!; // créer l'élément 'ul' et l'ajoute dans la const 'htmlGrid'
        htmlGrid.className = "ground_grid"; // attribut une class à htmlGrid
        let w = this.grid.width;
        let h = this.grid.height;

        for (let y=0; y<h; y++) {
            this.cells.push([]);

            // Dessin d'une ligne
            const htmlRow = document.createElement("li");
            const htmlCells = document.createElement("ul");
            htmlRow.className = "ground_row";
            htmlRow.appendChild(htmlCells); // appendChild ajoute l'élément htmlCells en tant que dernier enfant de htmlRow
            htmlGrid.appendChild(htmlRow); // idem
            for (let x=0; x<w; x++) {
                // Dessin d'une cellule
                const cell = this.grid.cells[y][x];
                const htmlCell = document.createElement("li"); // créer element li dans const htmlCell
                htmlCell.classList.add("ground_cell", "mask"); // attribut des class à htmlCell grâce à classListe.add()
                htmlCell.innerHTML = cell.bomb ? GridView.BOMB : "";
                htmlCell.onclick = () => game.play(this, cell);
                htmlCells.appendChild(htmlCell);
                this.cells[y].push(htmlCell);
            }
        }

        // Insertion du tableau dans la page
        htmlMain.appendChild(htmlGrid);
    }

    show(cell: Cell){
        this.cells[cell.y][cell.x].classList.remove("mask"); //  cell stock la cellule toucher à la position (x, y)  supprime la class mask
    }

    help(cell: Cell, hint: string) {
        this.cells[cell.y][cell.x].innerHTML = hint;
    }
}
