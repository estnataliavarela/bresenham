/**
 * Elemento canvas donde se dibujara la linea
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");

/**
 * Contexto 2D para dibujar en el canvas
 */
const ctx = canvas.getContext("2d");
/**
 * Funcion principal del programa
 */
function dibujar() {
    ctx.fillRect(50, 50, 5, 5);

    /**
     * Coordenadas ingresadas por el usuario
     */
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    console.log(x0, y0, x1, y1);
    plot(2, 3);
    dibujarPlano();
    dibujarEscala();
    bresenham(x0, y0, x1, y1, plot);
}
/**
 * Dibuja un pixel en el canvas aplicando escala
 */
function plot(x, y) {
    ctx.fillRect(x * 20, canvas.height - y * 20, 5, 5);
}
/**
 * Dibuja los ejes cartesianos
 */
function dibujarPlano() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
}
/**
 * Dibuja escala numerica en los ejes
 */
function dibujarEscala() {
    for (let i = 0; i <= 400; i += 20) {
        ctx.fillText(i / 20, i, canvas.height - 5);
        ctx.fillText(i / 20, 5, canvas.height - i);
    }
}
/**
 * Algoritmo de Bresenham
 */
function bresenham(x0, y0, x1, y1, plot) {

}
let dx = Math.abs(x1 - x0);
let dy = Math.abs(y1 - y0);
let sx = (x0 < x1) ? 1 : -1;
let sy = (y0 < y1) ? 1 : -1;
let err = dx - dy;
while (true) {

    plot(x0, y0);

    if (x0 === x1 && y0 === y1) break;

    let e2 = 2 * err;

    if (e2 > -dy) {
        err -= dy;
        x0 += sx;
    }

    if (e2 < dx) {
        err += dx;
        y0 += sy;
    }
}