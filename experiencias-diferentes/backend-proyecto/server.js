require('dotenv').config();
const express = require('express');
const { PORT } = process.env;
const app = express();
app.use(express.json());

const {
    usersController,
    activitiesController,
    booksController,
    ratingsController,
} = require('./controllers');
const {
    validateAuthorization,
    validateAdminRole,
} = require('./middlewares/validate-auth');

// Users
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.put(
    '/api/users/:id',
    validateAuthorization,
    usersController.updateUserInfo
);

app.post(
    '/api/activities',
    validateAuthorization,
    validateAdminRole,
    activitiesController.createActivity
);

app.put(
    '/api/activities/:id',
    validateAuthorization,
    validateAdminRole,
    activitiesController.updateActivity
);

//Rating

app.post(
    '/api/activities/:id/rate',
    validateAuthorization,
    ratingsController.ratingActivity
);

//Reservas

app.post(
    '/api/activities/:id/books',
    validateAuthorization,
    booksController.bookActivity
);

app.delete(
    '/api/activities/:id/books',
    validateAuthorization,
    booksController.deleteBook
);

app.use(async (err, req, res, next) => {
    //REVISAR - no funciona con errores incontrolados (p.ej. insert BBDD incumpliendo clave foránea)
    const status = err.isJoi ? 400 : err.code || 500;
    res.status(status);
    res.send({ error: err.message });
});

app.listen(PORT, () =>
    console.log(`Experiencias diferentes listening at port ${PORT}`)
);
