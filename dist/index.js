import { Game } from "./logic/game.js";
import { Grid } from "./logic/entities/grid.js";
import { GridView } from "./ui/grid.view.js";
window.addEventListener("load", (_) => {
    let grid = new Grid(20, 20, 0.1);
    let view = new GridView(grid);
    let game = new Game();
    view.draw(game);
    game.start();
});
