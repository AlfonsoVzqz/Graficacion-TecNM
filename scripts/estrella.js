let puntosEstrella = { x: [], y: [] };
let anguloEstrella = 0;
let anguloEjeX = 0;
let anguloEjeY = 0;

const GRADOS_GIRO_Z = 5;
const GRADOS_GIRO_XY = 5;

function Estrella() {
    anguloEstrella = 0;
    anguloEjeX = 0;
    anguloEjeY = 0;
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    for (let i = 5; i < 260; i += 5) {
        ctx.beginPath(); ctx.moveTo(centroX + i, centroY); ctx.lineTo(centroX, canvas.height - i); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(centroX - i, centroY); ctx.lineTo(centroX, canvas.height - i); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(centroX + i, centroY); ctx.lineTo(centroX, i); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(centroX - i, centroY); ctx.lineTo(centroX, i); ctx.stroke();
    }
    guardarPuntosEstrella();
}

function guardarPuntosEstrella() {
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    puntosEstrella = { x: [], y: [] };
    for (let i = 5; i < 260; i += 5) {
        puntosEstrella.x.push(centroX + i); puntosEstrella.y.push(centroY);
        puntosEstrella.x.push(centroX);     puntosEstrella.y.push(canvas.height - i);
        puntosEstrella.x.push(centroX - i); puntosEstrella.y.push(centroY);
        puntosEstrella.x.push(centroX);     puntosEstrella.y.push(canvas.height - i);
        puntosEstrella.x.push(centroX + i); puntosEstrella.y.push(centroY);
        puntosEstrella.x.push(centroX);     puntosEstrella.y.push(i);
        puntosEstrella.x.push(centroX - i); puntosEstrella.y.push(centroY);
        puntosEstrella.x.push(centroX);     puntosEstrella.y.push(i);
    }
}

function redibujarEstrella() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const cos = Math.cos(anguloEstrella);
    const sin = Math.sin(anguloEstrella);

    const escalaX = Math.cos(anguloEjeY);
    const escalaY = Math.cos(anguloEjeX);

    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.scale(escalaX, escalaY);
    ctx.translate(-centroX, -centroY);

    for (let i = 0; i < puntosEstrella.x.length - 1; i += 2) {
        const x1r = cos * (puntosEstrella.x[i]   - centroX) - sin * (puntosEstrella.y[i]   - centroY) + centroX;
        const y1r = sin * (puntosEstrella.x[i]   - centroX) + cos * (puntosEstrella.y[i]   - centroY) + centroY;
        const x2r = cos * (puntosEstrella.x[i+1] - centroX) - sin * (puntosEstrella.y[i+1] - centroY) + centroX;
        const y2r = sin * (puntosEstrella.x[i+1] - centroX) + cos * (puntosEstrella.y[i+1] - centroY) + centroY;
        ctx.beginPath();
        ctx.moveTo(x1r, y1r);
        ctx.lineTo(x2r, y2r);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    ctx.restore();
}

function dibujarEstrellaRotada(grados) {
    anguloEstrella += grados * (Math.PI / 180);
    redibujarEstrella();
}

function rotarEjeX() {
    anguloEjeX += GRADOS_GIRO_XY * (Math.PI / 180);
    redibujarEstrella();
}

function rotarEjeY() {
    anguloEjeY += GRADOS_GIRO_XY * (Math.PI / 180);
    redibujarEstrella();
}