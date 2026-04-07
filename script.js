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
 * Funcion principal que se ejecuta al presionar el boton
 * Controla el flujo del programa
 */
function dibujar() {
    console.log("Boton presionado");
}