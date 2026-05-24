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



