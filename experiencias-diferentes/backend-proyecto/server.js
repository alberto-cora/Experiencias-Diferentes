require('dotenv').config();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const express = require('express');
const { PORT } = process.env;
const app = express();
app.use(express.json());
const staticPath = path.resolve(__dirname, 'static');
app.use(express.static(staticPath));

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

const upload = multer({
    //midleware: duda sobre donde definirlo
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = path.join(__dirname, `static/images/`);
            fs.mkdirSync(folder, { recursive: true }); //la crea en el servidor

            cb(null, folder);
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + path.extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 1024 * 1024, // 1 MB
    },
});

// Users
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.put(
    '/api/users/:id',
    validateAuthorization,
    usersController.updateUserInfo
);
app.get('/api/users/:id', validateAuthorization, usersController.getUserInfo);

app.post(
    '/api/users/:id/image',
    validateAuthorization,
    upload.single('image'),
    usersController.uploadUsersImage
);

// Activities
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

app.get(
    '/api/activities/:id',
    validateAuthorization,
    activitiesController.getActivityInfo
);

app.post(
    '/api/activities/:id/image',
    validateAuthorization,
    validateAdminRole,
    upload.single('image'),
    activitiesController.uploadActivityImage
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
    const status = err.isJoi ? 400 : err.httpcode || 500;
    res.status(status);
    res.send({ error: err.message });
});

app.listen(PORT, () =>
    console.log(`Experiencias diferentes listening at port ${PORT}`)
);
