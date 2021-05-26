const Joi = require('joi');
const ratingsRepo = require('../repositories/ratings-repo');
const bookingsRepo = require('../repositories/books-repo');
const activitiesRepo = require('../repositories/activities-repo');

async function ratingActivity(req, res, next) {
    try {
        const activityId = req.params.id; //  destructuring: const {id:activityId} = req.params

        const userId = req.auth.id; //  destructuring: const ??

        const { rating } = req.body;

        const schema = Joi.number().positive().required();

        const ratingSchema = Joi.number().positive().required().max(5).min(1);

        await schema.validateAsync(activityId);
        await schema.validateAsync(userId);
        await ratingSchema.validateAsync(rating);

        // 1- actividad ya se ha realizado

        const activity = await activitiesRepo.findActivitiesById(activityId);
        if (!activity) {
            const error = new Error('No existe la actividad');
            error.httpcode = 401;

            throw error;
        }
        if (activity.fecha_fin > new Date()) {
            const error = new Error('La actividad no ha finalizado');
            error.httpcode = 401;

            throw error;
        }

        // 2- usuario ha hecho una reserva de la actividad que se va a valorar

        const userBooking = await bookingsRepo.findBooksByUserIdAndActivityId({
            userId,
            activityId,
        });

        if (!userBooking) {
            const error = new Error('Usuario no ha hecho reserva');
            error.httpcode = 401;

            throw error;
        }

        // 3-. Validamos que el usuario no haya puntuado la actividad

        const previousRate = await ratingsRepo.findRatingByUserIdAndActivityId({
            userId,
            activityId,
        });

        if (previousRate) {
            const error = new Error(
                'Ya existe una valoración sobre esta actividad'
            );
            error.httpcode = 401;

            throw error;
        }

        const ratingActivity = await ratingsRepo.ratingActivity({
            userId,
            activityId,
            rating,
        });

        res.status(201);
        res.send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    ratingActivity,
};
