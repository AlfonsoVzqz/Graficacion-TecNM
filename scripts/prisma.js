const h = 60;  
const r = 60; 

let prismVertices = [
  // Tapa superior (y = +h)
  { x:  0,          y:  h, z: -r       },  
  { x:  r * 0.866,  y:  h, z:  r * 0.5 },  
  { x: -r * 0.866,  y:  h, z:  r * 0.5 },  

  // Tapa inferior (y = -h)
  { x:  0,          y: -h, z: -r       },  
  { x:  r * 0.866,  y: -h, z:  r * 0.5 },  
  { x: -r * 0.866,  y: -h, z:  r * 0.5 },  
];
//Caras del prisma
const prismFaces = [
  { indices: [0, 1, 2],    color: 'cyan'   },  
  { indices: [3, 5, 4],    color: 'blue'   }, 
  { indices: [0, 3, 4, 1], color: 'red'    },
  { indices: [1, 4, 5, 2], color: 'green'  }, 
  { indices: [2, 5, 3, 0], color: 'orange' }, 
];

function drawPrism() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  borrarCanvas();
  DibujarPlano();

  const facesToDraw = prismFaces.map(face => {
    const projected = face.indices.map(i => project3D(prismVertices[i], cx, cy));
    const avgZ = projected.reduce((sum, p) => sum + p.z, 0) / projected.length;
    return { face, projected, avgZ };
  });

  facesToDraw.sort((a, b) => a.avgZ - b.avgZ);

  for (const { face, projected } of facesToDraw) {
    const points2D = projected.map(p => ({ x: p.x, y: p.y }));
    Poligono(points2D, face.color, 'black', 1);
  }
}


function rotatePrism(axis, angle) {
  const cx = 0, cy = 0, cz = 0;
  prismVertices = prismVertices.map(v => rotatePoint3D(v, cx, cy, cz, axis, angle));
  drawPrism();
}

function drawPrismShadow() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  borrarCanvas();
  DibujarPlano();

  const light = { x: -200, y: 400, z: -150 };
  const groundY = -(h + 80);

  const shadowPts = prismVertices.map(v => {
    const dy = v.y - light.y;
    if (Math.abs(dy) < 0.001) return null;
    const t = (groundY - light.y) / dy;
    if (t < 0) return null;
    const sx = light.x + t * (v.x - light.x);
    const sz = light.z + t * (v.z - light.z);
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

  // Indicador de fuente de luz
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

  // Dibujar el prisma encima de la sombra
  const facesToDraw = prismFaces.map(face => {
    const projected = face.indices.map(i => project3D(prismVertices[i], cx, cy));
    const avgZ = projected.reduce((sum, p) => sum + p.z, 0) / projected.length;
    return { face, projected, avgZ };
  });
  facesToDraw.sort((a, b) => a.avgZ - b.avgZ);
  for (const { face, projected } of facesToDraw) {
    Poligono(projected.map(p => ({ x: p.x, y: p.y })), face.color);
  }
}



