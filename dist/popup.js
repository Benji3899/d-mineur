// Affichage de la fenêtre victoire
export function win() {
    show("win");
}
// Affichage défaite
export function lose() {
    show("lose");
}
// Affichage d'une popup quelconque en manipulant son style 
export function show(popup) {
    const div = document.getElementById(popup);
    div === null || div === void 0 ? void 0 : div.classList.remove("hidden");
}
