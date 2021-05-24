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
/* const { activitiesRepo } = require('./repositories');
 */
// Users
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.put(
    '/api/users/:id',
    validateAuthorization,
    usersController.updateUserInfo
);

//activities
/* app.get('/api/activities', activitiesRepo.getActivities());
app.get('/api/activities/price', activitiesRepo.findActivitiesByPrice());
app.get('/api/activities/location', activitiesRepo.findActivitiesByLocation());
app.get('/api/activities/date', activitiesRepo.findActivitiesByDate());
app.get('/api/activities/type', activitiesRepo.findActivitiesByType());
 */
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
    const status = err.isJoi ? 400 : 500;
    res.status(status);
    res.send({ error: err.message });
});

app.listen(PORT, () =>
    console.log(`Experiencias diferentes listening at port ${PORT}`)
);
