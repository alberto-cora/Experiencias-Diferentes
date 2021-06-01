const Joi = require('joi');
const booksRepo = require('../repositories/books-repo');
const activitiesRepo = require('../repositories/activities-repo');
const { func } = require('joi'); //tiene que ver con el schema function?

async function bookActivity(req, res, next) {
    try {
        const activityId = req.params.id;

        const userId = req.auth.id;

        const schema = Joi.number().positive().required();

        await schema.validateAsync(activityId);
        await schema.validateAsync(userId);

        //Buscar actividad por id actividad (usar activityRepo!!!! )

        const realActivity = await activitiesRepo.findActivitiesById(
            activityId
        );

        if (!realActivity) {
            const error = new Error('No existe la actividad');
            error.httpcode = 401;

            throw error;
        }

        //Comprobar que el usuario no haya reservado previamente

        const previusBook = await booksRepo.findBooksByUserIdAndActivityId({
            userId,
            activityId,
        });

        if (previusBook) {
            const error = new Error('Actividad ya reservada');
            error.httpcode = 401;

            throw error;
        }

        // Última parte código función bookActivity

        const bookActivity = await booksRepo.bookActivity({
            userId,
            activityId,
        });

        res.status(201);
        res.send({
            message: 'Reserva realizada correctamente',
        });
    } catch (err) {
        next(err);
    }
}

async function deleteBook(req, res, next) {
    try {
        const activityId = req.params.id;

        const userId = req.auth.id;

        const schema = Joi.number().positive().required();

        await schema.validateAsync(activityId);
        await schema.validateAsync(userId);

        const realActivity = await activitiesRepo.findActivitiesById(
            activityId
        );

        if (!realActivity) {
            const error = new Error('No existe la actividad');
            error.httpcode = 401;

            throw error;
        }

        const previusBook = await booksRepo.findBooksByUserIdAndActivityId({
            userId,
            activityId,
        });

        if (!previusBook) {
            const error = new Error(
                'No existe ninguna reserva sobre esta actividad'
            );
            error.httpcode = 401;

            throw error;
        }
        const deleteBook = await booksRepo.deleteBook({
            userId,
            activityId,
        });
        res.status(201);
        res.send({
            message: 'Reserva eliminada',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    bookActivity,
    deleteBook,
};
