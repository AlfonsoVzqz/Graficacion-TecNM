function convertirCoordenadas(x, y) {
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    return { x: centroX + x, y: centroY - y };
}

function DibujarLinea(x1, y1, x2, y2, color) {
    const punto1 = convertirCoordenadas(x1, y1);
    const punto2 = convertirCoordenadas(x2, y2);
    ctx.beginPath();
    ctx.moveTo(punto1.x, punto1.y);
    ctx.lineTo(punto2.x, punto2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function DibujarPlano() {
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const espaciado = 10;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += espaciado) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += espaciado) {
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
    ctx.fillText("X", canvas.width - 10, centroY);
    ctx.fillText("Y", centroX, 10);
}