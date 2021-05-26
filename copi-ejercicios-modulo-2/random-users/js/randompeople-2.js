/**
 * Cada <li> debería tener una estructura similar a esta:
 *
 * <article>
 *      <header>
 *          <img src="${imagenUsuario}" alt="${nombreCompleto}">
 *          <h1>${nombreCompleto}</h1>
 *      </header>
 *      <p>${ciudad} (${país}), ${añoNacimiento}</p>
 * </article>
 *
 */

// Importamos la función getNumberOfUsers.
import getNumberOfUsers from './helpers.js';

// Función asíncrona que devuelve un nº X de usuarios.
const getUsers = async () => {
    try {
        // Llamamos a la función que me devuelve un nº del 1 al 100.
        const numberOfUsers = getNumberOfUsers();

        const response = await fetch(
            `https://randomuser.me/api/?results=${numberOfUsers}`
        );

        // Utilizamos destructuring para extraer dicha propiedad.
        const { results } = await response.json();

        // Seleccionamos el "ul".
        const ul = document.querySelector('ul.userlist');

        // Eliminamos el "li.loading".
        document.querySelector('li.loading').remove();

        // Recorremos el array.
        for (const user of results) {
            // Almaceno la información que me interesa.
            const picture = user.picture.large;
            const { first, last } = user.name;
            const { city, country } = user.location;
            const birthYear = new Date(user.dob.date).getFullYear();

            // Creo un "li".
            const li = document.createElement('li');

            // Creo el "article".
            const article = document.createElement('article');

            // Creo el "header".
            const header = document.createElement('header');

            // Creo el "img".
            const img = document.createElement('img');

            // Inserto dos nuevos atributos en "img".
            img.setAttribute('src', picture);
            img.setAttribute('alt', `${first} ${last}`);

            // Creamos el "h1".
            const h1 = document.createElement('h1');

            // Introducimos el contenido en el "h1".
            h1.textContent = `${first} ${last}`;

            // Creamos el "p".
            const p = document.createElement('p');

            // Insertamos el contenido en el "p".
            p.textContent = `${city} (${country}), ${birthYear}`;

            // Insertamos los hijos del "header".
            header.append(img, h1);

            // Insertamos los hijos del "article".
            article.append(header, p);

            // Insertamos los hijos del "li".
            li.append(article);

            // Insertamos los hijos del "ul".
            ul.append(li);
        }
    } catch (error) {
        console.log(error);
    }
};

// Metemos el llamado a la función dentro de un setTimeout para posponer
// su ejecución y permitir que aparezca en pantalla el mensaje de "Cargando...".
setTimeout(() => getUsers(), 500);
