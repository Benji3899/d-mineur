import { Game } from "./game.js";
import { Grid } from "./grid.js";
window.addEventListener("load", (_) => {
    let grid = new Grid();
    let game = new Game();
    grid.draw(game);
    // grid.draw();
});
