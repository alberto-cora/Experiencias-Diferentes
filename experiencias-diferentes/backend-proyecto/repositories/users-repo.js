const { func } = require('joi');
const { database } = require('../infrastructure');

async function findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    return users[0];
}

async function findUserById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [users] = await database.pool.query(query, id);

    return users[0];
}

async function createUser(data) {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    await database.pool.query(query, [data.name, data.email, data.password]);

    return findUserByEmail(data.email);
}

async function getUsers() {
    const [users] = await database.pool.query('SELECT * FROM users');

    return users;
}

async function updateUserInfo(user) {
    const query = 'UPDATE users SET name=?, email=? WHERE id=?';
    await database.pool.query(query, [user.name, user.email, user.id]);
}

async function updateUserImage(user) {
    const query = 'UPDATE users SET image=? WHERE id=?';
    await database.pool.query(query, [user.url, user.userId]);
}

async function updatePassword(user) {
    const query = 'UPDATE users SET password=? WHERE id=?';
    await database.pool.query(query, [user.newPasswordHash, user.id]);
}

module.exports = {
    findUserByEmail,
    createUser,
    getUsers,
    updateUserInfo,
    findUserById,
    updateUserImage,
    updatePassword,
};
