// Affichage de la fenêtre victoire
export function win() {
    show("win");
}

// Affichage défaite
export function lose() {
    show("lose");
}

// Affichage d'une popup quelconque en manipulant son style 
export function show(popup: string) {
    const div = document.getElementById(popup);
    div?.classList.remove("hidden");
}