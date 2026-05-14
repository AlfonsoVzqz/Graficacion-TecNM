// eventos.js - Conexión de botones con funciones
// IMPORTANTE: este archivo debe cargarse ÚLTIMO en el index.html

const GRADOS_ESTRELLA = 5; // <-- aquí defines cuántos grados gira cada click

document.getElementById("btnLimpiar").addEventListener("click", borrarCanvas);

document.getElementById("btnPunto").addEventListener("click", () =>
    Punto(100, 100, "blue")
);

document.getElementById("btnLinea").addEventListener("click", () =>
    Linea(50, 50, 200, 200, "green")
);

document.getElementById("DibujarRect").addEventListener("click", () =>
    Rectangulo(0, 0, 150, 100, "red")
);

document.getElementById("DibujarCirc").addEventListener("click", () =>
    Circulo(250, 250, 80, "purple")
);

document.getElementById("DibujarTri").addEventListener("click", () =>
    Triangulo(250, 250, 400, 250, 250, 100, "orange")
);

document.getElementById("DibujarPol").addEventListener("click", () =>
    Poligono([{ x: 300, y: 300 }, { x: 350, y: 350 }, { x: 400, y: 300 }, { x: 350, y: 250 }], "gray")
);

document.getElementById("PlanoCart").addEventListener("click", DibujarPlano);

document.getElementById("lineaUsuario").addEventListener("click", () => {
    DibujarLinea(
        Number(document.getElementById("inputx1").value),
        Number(document.getElementById("inputy1").value),
        Number(document.getElementById("inputx2").value),
        Number(document.getElementById("inputy2").value),
        "black"
    );
});

document.getElementById("dibujarEstrella").addEventListener("click", Estrella);

document.getElementById("girarEstrella").addEventListener("click", () => {
    dibujarEstrellaRotada(GRADOS_GIRO_Z);
});

document.getElementById("girarEjeX").addEventListener("click", rotarEjeX);
document.getElementById("girarEjeY").addEventListener("click", rotarEjeY);

document.getElementById("reloj").addEventListener("click", () => {
    CirculoLineas(250, 250, 150, Number(document.getElementById("manecillas").value));
});

document.getElementById("btnEliminarlineas").addEventListener("click", DibujarCircunferencia);

document.getElementById("btnHora").addEventListener("click", () => {
    const h = Number(document.getElementById("inputHoras").value);
    const m = Number(document.getElementById("inputMinutos").value);
    const s = Number(document.getElementById("inputSegundos").value);

    if (h > 23 || m > 59 || s > 59) {
        alert("Hora invalida");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DibujarCircunferencia();
    DibujarManecillas(h, m, s);
});