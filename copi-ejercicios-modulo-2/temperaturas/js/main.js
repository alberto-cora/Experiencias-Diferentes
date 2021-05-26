// lower --> Temp. menor que 4: fondo azul.
// low --> Temp. entre 4 y 20: fondo verde
// medium --> Temp. entre 20 y 30: fondo naranja
// high --> Temp. mayor de 30: fondo rojo

const temperaturas = [
    {
        city: 'A Coruña',
        min: 17,
        max: 23,
    },
    {
        city: 'Ferrol',
        min: 15,
        max: 32,
    },
    {
        city: 'Lugo',
        min: -20,
        max: 31,
    },
    {
        city: 'Ourense',
        min: 18,
        max: 35,
    },
    {
        city: 'Pontevedra',
        min: 18,
        max: 29,
    },
];

// Seleccionamos el tbody de la tabla.
const tbody = document.querySelector('table#temperaturas > tbody');

// Función que recibe una temperatura y devuelve un string.
function getTemp(temp) {
    if (temp < 4) {
        return 'lower';
    } else if (temp >= 4 && temp < 20) {
        return 'low';
    } else if (temp >= 20 && temp < 30) {
        return 'medium';
    } else if (temp >= 30) {
        return 'high';
    }
}

/**
 * ################
 * ## Solución 1 ##
 * ################
 */

// Recorremos el array.
for (const city of temperaturas) {
    // Creamos el elemento "tr".
    const tr = document.createElement('tr');

    // Introducimos la información en el "tr".
    tr.innerHTML = `
        <td>${city.city}</td>
        <td class=${getTemp(city.min)}>${city.min}</td>
        <td class=${getTemp(city.max)}>${city.max}</td>
    `;

    // Insertamos el elemento creado en el "tbody".
    tbody.append(tr);
}

/**
 * ################
 * ## Solución 2 ##
 * ################
 */

/* for (const city of temperaturas) {
    // Creamos el elemento "tr".
    const tr = document.createElement('tr');

    // Creamos los tres "td."
    const cityTD = document.createElement('td');
    const minTD = document.createElement('td');
    const maxTD = document.createElement('td');

    // Asignamos el contenido a los tres "td".
    cityTD.textContent = city.city;
    minTD.textContent = city.min;
    maxTD.textContent = city.max;

    // Le asignamos la clase a las temperaturas de dos formas
    // distintas.
    minTD.classList.add(getTemp(city.min));
    maxTD.className = getTemp(city.max);

    // Agregamos los tres "td" como hijos del "tr".
    tr.append(cityTD, minTD, maxTD);

    // Agregamos el "tr" como hijo del "tbody".
    tbody.append(tr);
} */
