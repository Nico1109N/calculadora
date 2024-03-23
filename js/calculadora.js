function cambiarEstilo() {
    let estiloHoja = document.getElementById("estiloHoja");
    let boton = document.getElementById("nombre");

    if (estiloHoja.getAttribute("href") === "css/styles.css") {
        estiloHoja.setAttribute("href", "css/styles_dark.css");
        boton.textContent = "Dark";
    } else {
        estiloHoja.setAttribute("href", "css/styles.css");
        boton.textContent = "Light";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const display = document.querySelector('input[type="text"]');
    const botones = document.querySelectorAll('.btn');

    // Función para limpiar el display
    function limpiarDisplay() {
        display.value = '';
    }

    // Función para manejar los clics en los botones
    function handleClick(event) {
        const boton = event.target;
        const valorBoton = boton.textContent;

        if (valorBoton === 'AC') {
            limpiarDisplay();
        } else if (valorBoton === '=') {
            try {
                display.value = evaluarExpresion(display.value);
            } catch (error) {
                display.value = 'Error';
            }
        } else if (valorBoton === 'B') {
            display.value = display.value.slice(0, -1);
        } else if (valorBoton === '%') {
            // Obtener la expresión del display
            let expresion = display.value;

            // Obtener el último operador y su índice
            let ultimoOperador = expresion.match(/[-+*/]/g).pop();
            let ultimoOperadorIndex = expresion.lastIndexOf(ultimoOperador);

            // Extraer el número antes del operador
            let numero = parseFloat(expresion.substring(ultimoOperadorIndex + 1));

            // Extraer el porcentaje del botón
            let porcentaje = parseFloat(expresion.substring(ultimoOperadorIndex + 1, expresion.length - 1)) / 100;

            // Calcular el porcentaje del número
            let resultado = numero * porcentaje;

            // Mostrar el resultado en el display
            display.value = resultado;
        } else {
            display.value += valorBoton;
        }
    }

    // Función para evaluar la expresión matemática
    function evaluarExpresion(expresion) {
        // Reemplazar símbolos de multiplicación y división
        expresion = expresion.replace(/x/g, '*').replace(/÷/g, '/');

        // Evaluar la expresión
        return Function('"use strict";return (' + expresion + ')')();
    }

    // Agregar event listeners a los botones
    botones.forEach(boton => {
        boton.addEventListener('click', handleClick);
    });
});