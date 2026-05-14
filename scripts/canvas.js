const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

function borrarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    puntosBorde = [];
}