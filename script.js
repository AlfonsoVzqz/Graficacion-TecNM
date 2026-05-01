const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");


//Funciones 
//Para borrar mi canvas
function borrarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    puntosBorde = [];
}

//Plano cartesiano
function DibujarPlano(){
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const espaciado = 10;

    //cuadricula
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    //verticales
    for(let x = 0; x <= canvas.width; x += espaciado){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    //horizontales
    for(let y = 0; y <= canvas.height; y += espaciado){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0, centroY);
    ctx.lineTo(canvas.width, centroY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centroX, 0);
    ctx.lineTo(centroX, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "12px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("X", canvas.width - 10, centroY - 0);
    ctx.fillText("Y", centroX + 0, 10);
}

//Funcion para convertir coordenadas
function convertirCoordenadas(x, y){
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    return {
        x: centroX + x,
        y: centroY - y
    };
}

function DibujarLinea(x1, y1, x2, y2, color){
    const punto1 = convertirCoordenadas(x1, y1);
    const punto2 = convertirCoordenadas(x2, y2);

    ctx.beginPath();
    ctx.moveTo(punto1.x, punto1.y);
    ctx.lineTo(punto2.x, punto2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

//Para dinujar figuras predefinidas

//Punto
function Punto(x,y,color){
ctx.beginPath();
ctx.arc(x, y, 3, 0, Math.PI * 2);
ctx.fillStyle = color;
ctx.fill();
}

//Linea
function Linea(x1,y1,x2,y2,color){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}
//Rectangulo
function Rectangulo(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,ancho,alto);
}

//Circulo
function Circulo (x, y, radio, color){
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

//Triangulo
function Triangulo(x1, y1, x2, y2, x3, y3, color){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

//Poligono
function Poligono(vertices, color){
    if(vertices.length < 3) return;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for(let i = 1; i < vertices.length; i++){
        ctx.lineTo(vertices[i].x, vertices[i].y);}
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

//Dibujar estrella
function Estrella(){
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    for(let i = 5; i < 260; i += 5){
        // Inferior derecho
    ctx.beginPath();
    ctx.moveTo(centroX + i, centroY);
    ctx.lineTo(centroX, canvas.height - i);
    ctx.stroke();

    // Inferior izquierdo
    ctx.beginPath();
    ctx.moveTo(centroX - i, centroY);
    ctx.lineTo(centroX, canvas.height - i);
    ctx.stroke();

    // Superior derecho
    ctx.beginPath();
    ctx.moveTo(centroX + i, centroY);
    ctx.lineTo(centroX, i);
    ctx.stroke();

    // Superior izquierdo
    ctx.beginPath();
    ctx.moveTo(centroX - i, centroY);
    ctx.lineTo(centroX, i);
    ctx.stroke();


    }
}

//Dibujar circulo con lineas
//Variable para guardar mis puntos de la circunferencia 
//fuera de la funcion
let puntosBorde = [];

function CirculoLineas(cx, cy, radio, pasos){
    puntosBorde = [];

    for(let i = 0; i < pasos; i++){
        const angulo = (i / pasos) * Math.PI * 2;
        // punto en el borde del circulo
        const x = cx + radio * Math.cos(angulo);
        const y = cy + radio * Math.sin(angulo);

        puntosBorde.push({x: x, y: y});

        // linea del centro al borde
        ctx.beginPath();
        ctx.moveTo(cx, cy);   // centro
        ctx.lineTo(x, y);     // borde
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function DibujarCircunferencia(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // linea entre puntos de la circunferencia
    ctx.beginPath();
    ctx.moveTo(puntosBorde[0].x, puntosBorde[0].y);

    for(let i = 1; i < puntosBorde.length; i++){
        ctx.lineTo(puntosBorde[i].x, puntosBorde[i].y);
    }

    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    //numeros reloj
    const cx = 250;
    const cy = 250;
    const radio = 150;

    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for(let num = 1; num <= 12; num++){
        const angulo = (num / 12) * Math.PI * 2 - Math.PI / 2;
        const x = cx + (radio - 15) * Math.cos(angulo);
        const y = cy + (radio - 15) * Math.sin(angulo);
        ctx.fillText(num, x, y);
    }

}

//Funcion para agregar manecillas segun la hora
function DibujarManecillas(horas, minutos, segundos){
    const cx = 250;
    const cy = 250;

    //Convertir hora a angulo
    const anguloHoras = (horas/12) * Math.PI * 2 - Math.PI / 2;
    const anguloMinutos = (minutos/60) * Math.PI * 2 - Math.PI / 2;
    const anguloSegundos = (segundos/60) * Math.PI * 2 - Math.PI / 2;

    //Manecilla de horas
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 60 * Math.cos(anguloHoras), cy + 60 * Math.sin(anguloHoras));
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();

    //minutero
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 90 * Math.cos(anguloMinutos), cy + 90 * Math.sin(anguloMinutos));
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.stroke();

    //segundero
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 120 * Math.cos(anguloSegundos), cy + 120 * Math.sin(anguloSegundos));
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
}



//Conectores de botones
document.getElementById("btnLimpiar").addEventListener("click", borrarCanvas);

document.getElementById("btnPunto").addEventListener("click", function(){
    Punto(100, 100, "blue");
});

document.getElementById("btnLinea").addEventListener("click", function(){
    Linea(50, 50, 200, 200, "green");
});

document.getElementById("DibujarRect").addEventListener("click", function(){
    Rectangulo(0, 0, 150, 100, "red");
});

document.getElementById("DibujarCirc").addEventListener("click", function(){
    Circulo(250, 250, 80, "purple");
});

document.getElementById("DibujarTri").addEventListener("click", function(){
    Triangulo(250, 250, 400, 250, 250, 100, "orange");
});

document.getElementById("DibujarPol").addEventListener("click", function(){
    const vertices = [
        {x: 300, y: 300},
        {x: 350, y: 350},
        {x: 400, y: 300},
        {x: 350, y: 250},
    ];
    Poligono(vertices, "gray");
});

document.getElementById("PlanoCart").addEventListener("click", function(){
    DibujarPlano();
});

document.getElementById("lineaUsuario").addEventListener("click", function(){
    const x1 = Number(document.getElementById("inputx1").value);
    const y1 = Number(document.getElementById("inputy1").value);
    const x2 = Number(document.getElementById("inputx2").value);
    const y2 = Number(document.getElementById("inputy2").value);
    DibujarLinea(x1, y1, x2, y2, "black");
});

document.getElementById("dibujarEstrella").addEventListener("click", function(){
    Estrella();
});

document.getElementById("reloj").addEventListener("click", function(){
    const pasos=Number(document.getElementById("manecillas").value);CirculoLineas(250, 250, 150, pasos);
});

document.getElementById("btnEliminarlineas").addEventListener("click", function(){
    DibujarCircunferencia();
});

document.getElementById("btnHora").addEventListener("click", function(){
    const horas = Number(document.getElementById("inputHoras").value);
    const minutos = Number(document.getElementById("inputMinutos").value);
    const segundos = Number(document.getElementById("inputSegundos").value);
    if(horas > 23 || minutos > 59 || segundos > 59){
            alert("Hora invalida");
            return;
        }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DibujarCircunferencia();
    DibujarManecillas(horas, minutos, segundos);
});