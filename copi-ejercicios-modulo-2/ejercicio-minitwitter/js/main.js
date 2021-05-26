/**
 * Ejemplo de la estructura final:
 *
 *  <ul id="tweets">
 *      <li>
 *          <p>Lo que escriba el usuario en el input.</p>
 *          <footer>
 *              <time>23/3/2021</time>
 *              <button class="action">Borrar</button>
 *          </footer>
 *      </li>
 *      <li>
 *          <p>Lo que escriba el usuario en el input.</p>
 *          <footer>
 *              <time>23/3/2021</time>
 *              <button class="action">Borrar</button>
 *          </footer>
 *      </li>
 *  </ul>
 */

// Importamos la función getDate().
import getDate from './helpers.js';

// Seleccionamos el botón del formulario.
const button = document.querySelector('form > button');

// Seleccionamos el formulario.
const form = document.forms.twitter;

// Seleccionamos el ul.
const ul = document.querySelector('ul#tweets');

// Función manejadora que inserta un uevo tweet.
const handleClickButton = (e) => {
    // Prevenimos el comportamiento por defecto del botón.
    e.preventDefault();

    // Creamos el li.
    const li = document.createElement('li');

    // Almacenamos el valor del input "tweet".
    const tweetContent = form.elements.tweet.value;

    if (tweetContent === '') {
        alert('No puedes enviar un tweet vacío.');
    } else if (tweetContent.length > 100) {
        alert('La longitud del tweet debe ser inferior a 100 caracteres.');
    } else {
        // Agregamos el contenido al li.
        li.innerHTML = `
            <p>${tweetContent}</p>
            <footer>
                <time>${getDate()}</time>
                <button class="delete">Borrar</button>
            </footer>
        `;

        // Insertamos el li como primer hijo del ul.
        ul.prepend(li);

        // Vaciamos el valor input;
        form.elements.tweet.value = '';
    }
};

// Asignamos el evento al botón.
button.addEventListener('click', handleClickButton);

// Función manejadora que elimina un tweet.
const handleClickTweet = (e) => {
    // Selecciono el elemento o nodo sobre el cuál ha pulsado el usuario.
    const currentElement = e.target;

    // Si el elemento clicado es el botón eliminamos el tweet.
    if (currentElement.matches('button.delete')) {
        // Seleccionamos el tweet (el li);
        const parentLi = currentElement.parentElement.parentElement;

        // Borramos el li.
        parentLi.remove();
    }
};

// Asignamos el evento al ul.
ul.addEventListener('click', handleClickTweet);
