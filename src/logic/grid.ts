import { Cell } from "./cell";

export class Grid {
  readonly width: number;
  readonly height: number;
  readonly density: number;
  readonly cells: Cell[][] = [];

  // Création d'une grille
  constructor(width: number, height: number, density: number) {
      this.width = width;
      this.height = height;
      this.density = density;
      for (let y = 0; y < this.height; y++) 
      {
        this.cells.push([]);
        for (let x = 0; x<this.width; x++) 
        {
            const bomb = Math.random() < this.density;
            const cell = new Cell(x, y, bomb);
            this.cells[y].push(cell);
        }
      }
  }
  // Explore le voisinage d'une cellule
  // explore(column: number, line: number, visit: (x: number, y: number) => void){
    explore(cell: Cell, visit: (near: Cell) => void){
    const xmin = Math.max(cell.x-1, 0);
    const xmax = Math.min(cell.x+1, this.width-1);
    const ymin = Math.max(cell.y-1, 0);
    const ymax = Math.min(cell.y+1, this.height-1);
    for (let x=xmin; x<=xmax; x++)
        for (let y=ymin; y<=ymax; y++)
            if (x != cell.x || y != cell.y)
                visit(this.cells[y][x]);
  }
}