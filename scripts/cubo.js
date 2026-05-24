
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



