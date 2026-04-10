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
    tabla.innerHTML = ""; // Limpia la tabla antes de empezar

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Punto inicial
    ctx.moveTo(30 + puntos[0].x * esc, canvas.height - 30 - puntos[0].y * esc);

    puntos.forEach((p, i) => {
        ctx.lineTo(30 + p.x * esc, canvas.height - 30 - p.y * esc);
        // Llenamos tu tabla de resultados
        tabla.innerHTML += `<tr><td>${i}</td><td>${p.x}</td><td>${p.y}</td><td>${p.error}</td></tr>`;
    });

    ctx.stroke();
}

function dibujarPlano(max, esc) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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