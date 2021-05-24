const { database } = require('../infrastructure');

async function bookActivity(booking) {
    const query =
        'INSERT INTO bookings (user_id, activity_id, reservado) VALUES (?, ?, ?)';
    await database.pool.query(query, [booking.userId, booking.activityId, 1]);
}

async function findBooksByUserIdAndActivityId(booking) {
    const query =
        'SELECT * FROM bookings WHERE user_id = ? AND activity_id = ?';
    const [books] = await database.pool.query(query, [
        booking.userId,
        booking.activityId,
    ]);
    return books[0];
}

async function deleteBook(booking) {
    const query = 'DELETE FROM bookings WHERE user_id = ? AND activity_id = ?';
    await database.pool.query(query, [booking.userId, booking.activityId]);
}

module.exports = {
    bookActivity,
    findBooksByUserIdAndActivityId,
    deleteBook,
};
