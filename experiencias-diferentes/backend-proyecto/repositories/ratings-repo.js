const { database } = require('../infrastructure');

async function ratingActivity(rating) {
    const query =
        'INSERT into rating (user_id, activity_id, rating) VALUES (?, ?, ?)'; //tienen que llamarse igual los parámetros que estén definidos en la base de datos script ddl
    await database.pool.query(query, [
        rating.userId,
        rating.activityId,
        rating.rating,
    ]);
}

async function findRatingByUserIdAndActivityId(rating) {
    const query = 'SELECT * FROM rating WHERE user_id = ? AND activity_id = ?';
    const [rate] = await database.pool.query(query, [
        rating.userId,
        rating.activityId,
    ]);
    return rate[0];
}

async function findAvgRatingByActivityId(activityId) {
    const query = 'SELECT AVG(rating) as avg FROM rating WHERE activity_id=?';
    const [avgRating] = await database.pool.query(query, [activityId]);
    return avgRating[0].avg;
}

module.exports = {
    ratingActivity,
    findRatingByUserIdAndActivityId,
    findAvgRatingByActivityId,
};
