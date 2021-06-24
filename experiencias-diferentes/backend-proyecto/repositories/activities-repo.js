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

async function findActivitiesById(id) {
    const query = 'SELECT * FROM activities WHERE id = ?';
    const [activities] = await database.pool.query(query, id);

    return activities[0];
}

async function updateActivityImage(activity) {
    const query = 'UPDATE activities SET image=? WHERE id=?';
    await database.pool.query(query, [activity.url, activity.activityId]);
}

async function searchActivities({ type, date, location, price }) {
    let query = 'SELECT * FROM activities';
    const params = [];

    if (type || date || location || price) {
        query = `${query} WHERE`;
        const conditions = [];

        conditions.push('fecha_fin >= current_timestamp()');

        if (type) {
            conditions.push('type=?');
            params.push(type);
        }

        if (date) {
            conditions.push(`fecha_inicio <= ? AND fecha_fin >= ?`);
            params.push(date, date);
        }

        if (location) {
            conditions.push('location LIKE ?');
            params.push(`%${location}%`);
        }
        if (price) {
            conditions.push('price <=?');
            params.push(price);
        }

        query = `${query} ${conditions.join(' AND  ')}`;
    }

    query += ' ORDER BY FECHA_INICIO ASC';
    console.log(query);

    const [activities] = await database.pool.query(query, params);
    return activities;
}

async function getUsersActivities(userId) {
    const query =
        ' SELECT a.* FROM activities a  join bookings b on a.id=b.activity_id where b.user_id= ?';
    const [activities] = await database.pool.query(query, userId);

    return activities;
}

module.exports = {
    createActivity,
    updateActivity,
    updateActivityImage,
    findActivitiesById,
    searchActivities,
    getUsersActivities,
};
