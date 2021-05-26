// Función que retorna un número del 1 al 100.
const getNumberOfUsers = () => {
    let numberOfUsers;

    do {
        numberOfUsers = Number(
            prompt('¿Cuántos usuarios quieres? (del 1 al 100).')
        );

        if (numberOfUsers < 1 || numberOfUsers > 100) {
            alert(
                'Valor incorrecto. Seleccione un nº de usuarios entre 1 y 100.'
            );
        }
    } while (numberOfUsers < 1 || numberOfUsers > 100);

    return numberOfUsers;
};

/* export {
    getNumberOfUsers
} */

export default getNumberOfUsers;
