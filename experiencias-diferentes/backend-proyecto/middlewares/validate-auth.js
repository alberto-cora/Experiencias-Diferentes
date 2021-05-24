const jwt = require('jsonwebtoken');
const { database } = require('../infrastructure');

async function validateAuthorization(req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            const error = new Error('Authorization header required');
            error.code = 401;
            throw error;
        }

        const token = authorization.slice(7, authorization.length);
        const decodedToken = jwt.verify(token, process.env.SECRET);

        // Comprobamos que el usuario para el que fue emitido
        // el token todavía existe.
        const query = 'SELECT * FROM users WHERE id = ?';
        const [users] = await database.pool.query(query, decodedToken.id);

        if (!users || !users.length) {
            const error = new Error('El usuario ya no existe');
            error.code = 401;
            throw error;
        }

        req.auth = decodedToken;
        next();
    } catch (err) {
        next(err);
    }
}

async function validateAdminRole(req, res, next) {
    try {
        const auth = req.auth;
        if (!auth) {
            const error = new Error('usuario no autenticado');
            error.code = 401;
            throw error;
        }

        if (!auth.role || auth.role != 'admin') {
            const error = new Error('usuario no es administrador');
            error.code = 401;
            throw error;
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    validateAuthorization,
    validateAdminRole,
};
