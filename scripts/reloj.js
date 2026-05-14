let puntosBorde = [];

function CirculoLineas(cx, cy, radio, pasos) {
    puntosBorde = [];
    for (let i = 0; i < pasos; i++) {
        const angulo = (i / pasos) * Math.PI * 2;
        const x = cx + radio * Math.cos(angulo);
        const y = cy + radio * Math.sin(angulo);
        puntosBorde.push({ x, y });
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function DibujarCircunferencia() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(puntosBorde[0].x, puntosBorde[0].y);
    for (let i = 1; i < puntosBorde.length; i++) {
        ctx.lineTo(puntosBorde[i].x, puntosBorde[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    const cx = 250, cy = 250, radio = 150;
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let num = 1; num <= 12; num++) {
        const angulo = (num / 12) * Math.PI * 2 - Math.PI / 2;
        ctx.fillText(num,
            cx + (radio - 15) * Math.cos(angulo),
            cy + (radio - 15) * Math.sin(angulo)
        );
    }
}

function DibujarManecillas(horas, minutos, segundos) {
    const cx = 250, cy = 250;
    const anguloHoras    = (horas    / 12) * Math.PI * 2 - Math.PI / 2;
    const anguloMinutos  = (minutos  / 60) * Math.PI * 2 - Math.PI / 2;
    const anguloSegundos = (segundos / 60) * Math.PI * 2 - Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 60  * Math.cos(anguloHoras),    cy + 60  * Math.sin(anguloHoras));
    ctx.strokeStyle = "black"; ctx.lineWidth = 4; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 90  * Math.cos(anguloMinutos),  cy + 90  * Math.sin(anguloMinutos));
    ctx.strokeStyle = "black"; ctx.lineWidth = 4; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 120 * Math.cos(anguloSegundos), cy + 120 * Math.sin(anguloSegundos));
    ctx.strokeStyle = "red"; ctx.lineWidth = 1; ctx.stroke();
}