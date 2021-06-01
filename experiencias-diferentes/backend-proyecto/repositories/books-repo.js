const { func } = require('joi');
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

async function findTotalBookingsCountByActivityId(activityId) {
    const query =
        'SELECT COUNT(*) as total FROM bookings WHERE activity_id = ?';
    const [totalBooks] = await database.pool.query(query, [activityId]);

    return totalBooks[0].total; // valor de lo q está dentro del campo total
}

module.exports = {
    bookActivity,
    findBooksByUserIdAndActivityId,
    deleteBook,
    findTotalBookingsCountByActivityId,
};
