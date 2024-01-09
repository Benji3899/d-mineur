// import { play, start } from "./game.js";
import { Game } from "./game.js";

export class Grid {
  private static readonly BOMB = '<span class="icon material-symbols-outlined">bomb</span>';

  width = 20;
  height = 20;
  density = 0.1; // 10% de bombes
  bombs: boolean[][] = [];
  hits: boolean[][] = [];
  cells: HTMLElement[][] = [];

  // Dessin de la grille
  draw(game: Game) {
    // Création d'une grille à l'aide de listes imbriquées
    const htmlMain = document.getElementById("ground")!; // attribut l'élément qui à l'id "ground" dans la const 'htmlMain'
    const htmlGrid = document.createElement("ul")!; // créer l'élément 'ul' et l'ajoute dans la const 'htmlGrid'
    htmlGrid.className = "ground_grid"; // attribut une class à htmlGrid

    for (let y = 0; y < this.height; y++) {
      this.bombs.push([]);
      this.hits.push([]);
      this.cells.push([]);

      // Dessin d'une ligne
      const htmlRow = document.createElement("li");
      const htmlCells = document.createElement("ul");
      htmlRow.className = "ground_row";
      htmlRow.appendChild(htmlCells); // appendChild ajoute l'élément htmlCells en tant que dernier enfant de htmlRow
      htmlGrid.appendChild(htmlRow); // idem

      for (let x = 0; x < this.width; x++) {
        const bomb = Math.random() < this.density;
        this.bombs[y].push(bomb);
        this.hits[y].push(false);

        // Dessin d'une cellule
        const htmlCell = document.createElement("li"); // créer element li dans const htmlCell
        htmlCell.classList.add("ground_cell", "mask"); // attribut des class à htmlCell grâce à classListe.add()
        htmlCell.innerHTML = bomb ? Grid.BOMB : "";
        htmlCell.onclick = () => game.play(this, x, y);
        htmlCells.appendChild(htmlCell);
        this.cells[y].push(htmlCell);
      }
    }

    // Insertion du tableau dans la page
    htmlMain.appendChild(htmlGrid);
    game.start(this);
  }
}
