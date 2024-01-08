import { play, start } from "./game.js";

export class Grid {
  private static readonly BOMB =
    '<span class="icon material-symbols-outlined">bomb</span>';

  WIDTH = 20;
  HEIGHT = 20;
  DENSITY = 0.1; // 10% de bombes
  BOMBS: boolean[][] = [];
  HITS: boolean[][] = [];
  CELLS: HTMLElement[][] = [];

  // Dessin de la grille
  draw() {
    // Création d'une grille à l'aide de listes imbriquées
    const htmlMain = document.getElementById("ground")!; // attribut l'élément qui à l'id "ground" dans la const 'htmlMain'
    const htmlGrid = document.createElement("ul")!; // créer l'élément 'ul' et l'ajoute dans la const 'htmlGrid'
    htmlGrid.className = "ground_grid"; // attribut une class à htmlGrid

    for (let y = 0; y < this.HEIGHT; y++) {
      this.BOMBS.push([]);
      this.HITS.push([]);
      this.CELLS.push([]);

      // Dessin d'une ligne
      const htmlRow = document.createElement("li");
      const htmlCells = document.createElement("ul");
      htmlRow.className = "ground_row";
      htmlRow.appendChild(htmlCells); // appendChild ajoute l'élément htmlCells en tant que dernier enfant de htmlRow
      htmlGrid.appendChild(htmlRow); // idem

      for (let x = 0; x < this.WIDTH; x++) {
        const bomb = Math.random() < this.DENSITY;
        this.BOMBS[y].push(bomb);
        this.HITS[y].push(false);

        // Dessin d'une cellule
        const htmlCell = document.createElement("li"); // créer element li dans const htmlCell
        htmlCell.classList.add("ground_cell", "mask"); // attribut des class à htmlCell grâce à classListe.add()
        htmlCell.innerHTML = bomb ? Grid.BOMB : "";
        htmlCell.onclick = () => play(this, x, y);
        htmlCells.appendChild(htmlCell);
        this.CELLS[y].push(htmlCell);
      }
    }

    // Insertion du tableau dans la page
    htmlMain.appendChild(htmlGrid);
    start(this);
  }
}
