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
}
/**
 * Dibuja un pixel en el canvas aplicando escala
 */
function plot(x, y) {
    ctx.fillRect(x * 20, canvas.height - y * 20, 5, 5);
}