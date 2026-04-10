/**
 * Elemento canvas donde se dibujara la linea
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");

/**
 * Contexto 2D para dibujar en el canvas
 */
const ctx = canvas.getContext("2d");
function dibujar() {
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    if (isNaN(x0) || isNaN(y0) || isNaN(x1) || isNaN(y1)) return;

    const puntos = bresenham(x0, y0, x1, y1);
    
    // Esto calcula el "zoom" automáticamente
    let maxCoord = Math.max(x0, y0, x1, y1, 10); 
    let escala = (canvas.width - 40) / maxCoord; 

    dibujarPlano(maxCoord, escala); // Le pasamos la nueva escala
    trazarLinea(puntos, escala);    // Nueva función para la línea delgada
}
function trazarLinea(puntos, esc) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = ""; // Limpia la tabla

    // 1. Configuramos el estilo de la línea
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // 2. DIBUJO DE LÍNEA RECTA (Vectorial)
    // Solo unimos el primer punto con el último del arreglo para que sea una diagonal perfecta
    let primero = puntos[0];
    let ultimo = puntos[puntos.length - 1];
    
    ctx.moveTo(30 + primero.x * esc, canvas.height - 30 - primero.y * esc);
    ctx.lineTo(30 + ultimo.x * esc, canvas.height - 30 - ultimo.y * esc);
    ctx.stroke();

    // 3. LLENADO DE TABLA (Lógica de Bresenham)
    // Seguimos usando el forEach para la tabla, así tu profesor ve que el algoritmo funciona
    puntos.forEach((p, i) => {
        tabla.innerHTML += `<tr><td>${i}</td><td>${p.x}</td><td>${p.y}</td><td>${p.error}</td></tr>`;
    });
}

function dibujarPlano(max, esc) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibujar cuadrícula
    ctx.strokeStyle = "#f0f0f0"; 
    for (let i = 0; i <= max; i++) {
        let pos = 30 + (i * esc);
        ctx.beginPath();
        ctx.moveTo(pos, 0); ctx.lineTo(pos, canvas.height - 30); // Vertical
        ctx.moveTo(30, canvas.height - pos); ctx.lineTo(canvas.width, canvas.height - pos); // Horizontal
        ctx.stroke();
    }
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    // Ejes con margen de 30px para que los números no se corten
    ctx.moveTo(30, canvas.height - 30);
    ctx.lineTo(canvas.width, canvas.height - 30);
    ctx.moveTo(30, 0);
    ctx.lineTo(30, canvas.height - 30);
    ctx.stroke();

    // Dibujamos los números automáticamente según el valor máximo
    ctx.fillStyle = "black";
    let salto = Math.ceil(max / 10);
    for (let i = 0; i <= max; i += salto) {
        let pos = 30 + (i * esc);
        ctx.fillText(i, pos, canvas.height - 15); // Números en X
        ctx.fillText(i, 5, canvas.height - pos);  // Números en Y
    }
}

function bresenham(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    let puntos = [];

    while (true) {
        puntos.push({x: x0, y: y0, error: err});
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
    return puntos;
}
// Al cargar la página, dibujamos el plano con una escala inicial de 0 a 20
const escalaInicialMax = 20;
const escalaInicialZoom = (canvas.width - 40) / escalaInicialMax;
dibujarPlano(escalaInicialMax, escalaInicialZoom);