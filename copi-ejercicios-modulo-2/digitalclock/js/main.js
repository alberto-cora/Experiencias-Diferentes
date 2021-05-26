// 1. El primer paso será seleccionar los nodos que queremos
//    modificar.
const h1 = document.querySelector('body > header > h1');

const h2 = document.querySelector('body > header > h2');

const body = document.querySelector('body');

setInterval(() => {
    // Obtenemos la fecha actual.
    const now = new Date();

    // Obtener la hora, los minutos y los segundos.
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();

    const minutes =
        now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();

    const seconds =
        now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    // Si el segundo es par mostramos los dos puntos, de lo contrario no.
    if (seconds % 2 === 0) {
        h1.textContent = `${hour}:${minutes}:${seconds}`;
    } else {
        h1.textContent = `${hour} ${minutes} ${seconds}`;
    }

    /**
     * También podríamos guardar en una constante llamada
     * "separator" un string con el separador, que sería
     * o bien un espacio en blanco o bien los dos puntos.
     *
     * const separator = (seconds % 2 === 0) ? ':' : ' ';
     *
     * h1.textContent = `${hour}${separator}${minutes}${separator}${seconds}`;
     *
     */

    // Obtener el día del mes, el mes y el año.
    const day = now.getDate();
    const month = now.toLocaleDateString('es-ES', {
        month: 'long',
    });
    const year = now.getFullYear();

    /**
     * La idea principal es utilizar un switch que, en función del mes (en valor numérico)
     * me devuelva un string con ese mes. En este caso vamos a hacer uso del método
     * "toLocaleDateString()".
     *
     * También podemos crear un array con el nombre de los 12 meses y utilizar el index para
     * sacar un mes u otro.
     */

    h2.textContent = `${day} de ${month} de ${year}`;

    // Cambiamos la clase del body en función de la hora.
    if (Number(hour) >= 7 && Number(hour) < 13) {
        body.classList.remove('night');
        body.classList.add('morning');
    } else if (Number(hour) >= 13) {
        body.classList.remove('morning');
        body.classList.add('afternoon');
    } else if (Number(hour) >= 21 || Number(hour) < 7) {
        body.classList.remove('afternoon');
        body.classList.add('night');
    }
}, 1000);

console.log(new Date());
