
const size = 80;
const half = size / 2;

// Vértices del cubo (centrado en 0,0,0)
let cubeVertices = [
  { x: -half, y: -half, z: -half }, // 0
  { x:  half, y: -half, z: -half }, // 1
  { x:  half, y:  half, z: -half }, // 2
  { x: -half, y:  half, z: -half }, // 3
  { x: -half, y: -half, z:  half }, // 4
  { x:  half, y: -half, z:  half }, // 5
  { x:  half, y:  half, z:  half }, // 6
  { x: -half, y:  half, z:  half }, // 7
];

const cubeFaces = [
  { indices: [0, 1, 2, 3], color: 'red'    }, // frente  (z-)
  { indices: [5, 4, 7, 6], color: 'blue'   }, // atrás   (z+)
  { indices: [4, 0, 3, 7], color: 'green'  }, // izquierda
  { indices: [1, 5, 6, 2], color: 'yellow' }, // derecha
  { indices: [4, 5, 1, 0], color: 'orange' }, // abajo
  { indices: [3, 2, 6, 7], color: 'purple' }, // arriba
];

function project3D(vertex, cx, cy) {
    return {
        x: cx + vertex.x,
        y: cy - vertex.y,  // Y hacia arriba en matemáticas, hacia abajo en canvas
        z: vertex.z
    };
}

function drawCube() {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    borrarCanvas();
    DibujarPlano();
    // Calcular profundidad media de cada cara (para pintar atrás primero)
    const facesToDraw = cubeFaces.map(face => {
        const projected = face.indices.map(i => project3D(cubeVertices[i], cx, cy));
        const avgZ = projected.reduce((sum, p) => sum + p.z, 0) / projected.length;
        return { face, projected, avgZ };
    });
    facesToDraw.sort((a, b) => a.avgZ - b.avgZ); // más lejos primero
    for (const { face, projected } of facesToDraw) {
        const points2D = projected.map(p => ({ x: p.x, y: p.y }));
        Poligono(points2D, face.color, 'black', 1);
    }
}

function rotatePoint3D(p, cx, cy, cz, axis, angleDeg) {
    const rad = angleDeg * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    let x = p.x - cx, y = p.y - cy, z = p.z - cz;
    let xRot, yRot, zRot;
    if (axis === 'Z') {
        xRot = x * cos - y * sin;
        yRot = x * sin + y * cos;
        zRot = z;
    } else if (axis === 'X') {
        xRot = x;
        yRot = y * cos - z * sin;
        zRot = y * sin + z * cos;
    } else { // 'Y'
        xRot = x * cos + z * sin;
        yRot = y;
        zRot = -x * sin + z * cos;
    }
    return { x: xRot + cx, y: yRot + cy, z: zRot + cz };
}
function rotateCube(axis, angle) {
    const cx = 0, cy = 0, cz = 0; // el cubo está centrado en el origen
    cubeVertices = cubeVertices.map(v => rotatePoint3D(v, cx, cy, cz, axis, angle));
    drawCube();
}

function convexHull2D(pts) {
    if (pts.length < 3) return pts.slice();
    let lo = 0;
    for (let i = 1; i < pts.length; i++)
        if (pts[i].x < pts[lo].x || (pts[i].x === pts[lo].x && pts[i].y < pts[lo].y)) lo = i;
    const hull = [];
    let cur = lo;
    do {
        hull.push(pts[cur]);
        let nxt = (cur + 1) % pts.length;
        for (let i = 0; i < pts.length; i++) {
            const cross = (pts[nxt].x - pts[cur].x) * (pts[i].y - pts[cur].y)
                        - (pts[nxt].y - pts[cur].y) * (pts[i].x - pts[cur].x);
            if (cross < 0) nxt = i;
        }
        cur = nxt;
    } while (cur !== lo && hull.length <= pts.length);
    return hull;
}

function drawCubeShadow() {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    borrarCanvas();
    DibujarPlano();

    // Fuente de luz puntual en coordenadas 3D matemáticas (arriba-izquierda)
    const light = { x: -200, y: 400, z: -150 };
    // Plano del piso: y = -(half + 30) en coordenadas matemáticas
    const groundY = -(half + 80);

    // Proyectar cada vértice del cubo sobre el plano del piso desde la fuente de luz
    const shadowPts = cubeVertices.map(v => {
        const dy = v.y - light.y;
        if (Math.abs(dy) < 0.001) return null;
        const t = (groundY - light.y) / dy;
        if (t < 0) return null;
        const sx = light.x + t * (v.x - light.x);
        const sz = light.z + t * (v.z - light.z);
        // Proyección oblicua del piso: z contribuye a x e y para dar sensación 3D
        return {
            x: cx + sx + sz * 0.3,
            y: (cy - groundY) - sz * 0.2
        };
    }).filter(p => p !== null);

    if (shadowPts.length >= 3) {
        const hull = convexHull2D(shadowPts);
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(hull[0].x, hull[0].y);
        for (let i = 1; i < hull.length; i++) ctx.lineTo(hull[i].x, hull[i].y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Dibujar indicador de la fuente de luz (clampeado al canvas si queda fuera)
    const lightCanvasX = Math.max(8, Math.min(canvas.width - 8, cx + light.x));
    const lightCanvasY = Math.max(8, Math.min(canvas.height - 8, cy - light.y));
    ctx.save();
    ctx.beginPath();
    ctx.arc(lightCanvasX, lightCanvasY, 7, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Dibujar el cubo encima de la sombra
    const facesToDraw = cubeFaces.map(face => {
        const projected = face.indices.map(i => project3D(cubeVertices[i], cx, cy));
        const avgZ = projected.reduce((sum, p) => sum + p.z, 0) / projected.length;
        return { face, projected, avgZ };
    });
    facesToDraw.sort((a, b) => a.avgZ - b.avgZ);
    for (const { face, projected } of facesToDraw) {
        Poligono(projected.map(p => ({ x: p.x, y: p.y })), face.color);
    }
}



