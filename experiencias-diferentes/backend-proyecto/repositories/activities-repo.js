const { database } = require('../infrastructure');

async function createActivity(activity) {
    const query =
        'INSERT INTO activities (titulo, type, descripcion, fecha_inicio, fecha_fin,plazas_totales, price, location) VALUES (?,?,?,?,?,?,?,?)';
    await database.pool.query(query, [
        activity.activityName,
        activity.type,
        activity.description,
        activity.startDate,
        activity.endDate,
        activity.totalPlaces,
        activity.price,
        activity.location,
    ]);
}

async function updateActivity(activity) {
    const query =
        'UPDATE activities SET titulo=?, type=?, descripcion=?, fecha_inicio=?, fecha_fin=?, plazas_totales=?, price=?, location=? WHERE id=?';
    await database.pool.query(query, [
        activity.activityName,
        activity.type,
        activity.description,
        activity.startDate,
        activity.endDate,
        activity.totalPlaces,
        activity.price,
        activity.location,
        activity.id,
    ]);
}

async function getActivities() {
    const [activities] = await database.pool.query('SELECT * from activities');
    return activities;
}

async function findActivitiesById(id) {
    const query = 'SELECT * FROM activities WHERE id = ?';
    const [activities] = await database.pool.query(query, id);

    return activities[0];
}

async function findActivitiesByPrice(price) {
    const query = 'SELECT * FROM activities WHERE price = ?';
    const [activities] = await database.pool.query(query, price);

    return activities[0];
}

async function findActivitiesByLocation(location) {
    const query = 'SELECT * FROM activities WHERE location = ?';
    const [activities] = await database.pool.query(query, location);

    return activities[0];
}

async function findActivitiesByDate(fecha_inicio, fecha_fin) {
    const query =
        'SELECT * FROM activities WHERE fecha_inicio = ? AND fecha_fin = ?';
    const [activities] = await database.pool.query(
        query,
        fecha_inicio,
        fecha_fin
    );
    return activities[0];
}

async function findActivitiesByType(type) {
    const query = 'SELECT * FROM activities WHERE type = ?';
    const [activities] = await database.pool.query(query, type);

    return activities[0];
}

module.exports = {
    createActivity,
    updateActivity,
    getActivities,
    findActivitiesById,
    findActivitiesByPrice,
    findActivitiesByLocation,
    findActivitiesByDate,
    findActivitiesByType,
};
