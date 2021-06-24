const Joi = require('joi');
const activitiesRepo = require('../repositories/activities-repo');
const booksRepo = require('../repositories/books-repo');
const ratingsRepo = require('../repositories/ratings-repo');

async function createActivity(req, res, next) {
    try {
        const {
            activityName,
            type,
            description,
            location,
            startDate,
            endDate,
            price,
            totalPlaces,
        } = req.body;

        const schema = Joi.object({
            activityName: Joi.string().required(),
            type: Joi.string().required(),
            description: Joi.string(),
            location: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            price: Joi.number().required(),
            totalPlaces: Joi.number().min(1).required(),
        });

        await schema.validateAsync(req.body);

        await activitiesRepo.createActivity({
            activityName,
            type,
            description,
            location,
            startDate,
            endDate,
            price,
            totalPlaces,
        });

        res.status(201);
        res.send({
            message: 'Actividad creada correctamente',
        });
    } catch (err) {
        next(err);
    }
}

async function updateActivity(req, res, next) {
    try {
        const { id } = req.params;

        const {
            activityName,
            type,
            description,
            location,
            startDate,
            endDate,
            price,
            totalPlaces,
        } = req.body;

        const schema = Joi.object({
            activityName: Joi.string().required(),
            type: Joi.string().required(),
            description: Joi.string(),
            location: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            price: Joi.number().required(),
            totalPlaces: Joi.number().min(1).required(),
        });

        await schema.validateAsync(req.body);

        await activitiesRepo.updateActivity({
            id,
            activityName,
            type,
            description,
            location,
            startDate,
            endDate,
            price,
            totalPlaces,
        });

        res.status(201);
        res.send({
            message: 'Actividad actualizada corretamente',
        });
    } catch (err) {
        next(err);
    }
}

async function getActivityInfo(req, res, next) {
    try {
        const activityId = req.params.id;

        const activity = await activitiesRepo.findActivitiesById(activityId);

        const totalBooks = await booksRepo.findTotalBookingsCountByActivityId(
            //volver a invocarlo en la reserva
            activityId
        );

        const avgRating = await ratingsRepo.findAvgRatingByActivityId(
            activityId
        );

        res.status(200);
        res.send({
            title: activity.titulo,
            id: activity.id,
            type: activity.type,
            description: activity.descripcion,
            startDate: activity.fecha_inicio,
            endDate: activity.fecha_fin,
            totalPlaces: activity.plazas_totales,
            price: activity.price,
            location: activity.location,
            availablePlaces: activity.plazas_totales - totalBooks,
            rating: avgRating,
            image: `http://localhost:3080/images/${activity.image}`,
        });
    } catch (err) {
        next(err);
    }
}

async function getUsersActivities(req, res, next) {
    const tokenUserId = req.auth.id;
    const userId = req.params.id;

    const schema = Joi.number().positive().required();

    await schema.validateAsync(userId);
    await schema.validateAsync(tokenUserId);

    if (tokenUserId != userId) {
        const error = new Error('id usuario inválido');
        error.httpcode = 401;

        throw error;
    }

    const activities = await activitiesRepo.getUsersActivities(userId);
    res.send(
        activities.map((activity) => ({
            title: activity.titulo,
            id: activity.id,
            type: activity.type,
            description: activity.descripcion,
            startDate: activity.fecha_inicio,
            endDate: activity.fecha_fin,
            totalPlaces: activity.plazas_totales,
            price: activity.price,
            location: activity.location,
            image: `http://localhost:3080/images/${activity.image}`,
        }))
    );
}

async function uploadActivityImage(req, res, next) {
    //no voy a actualizar imagen, voy a devolverla en front como resultado de la búsqueeda por id actividad
    try {
        const activityId = req.params.id;
        const { file } = req;
        const schema = Joi.number().positive().required();
        await schema.validateAsync(activityId);

        const url = file.filename;

        await activitiesRepo.updateActivityImage({
            activityId,
            url,
        });

        res.status(201);
        res.send({
            message: 'Imagen de actividad subida correctamente',
        });
    } catch (err) {
        next(err);
    }
}

async function searchActivities(req, res, next) {
    try {
        const { type, date, location, price } = req.query;
        const schema = Joi.object({
            type: Joi.string(),
            date: Joi.date(),
            location: Joi.string(),
            price: Joi.number(),
        });

        await schema.validateAsync(req.query);

        const activities = await activitiesRepo.searchActivities({
            type,
            date,
            location,
            price,
        });
        res.send(
            activities.map((activity) => ({
                title: activity.titulo,
                id: activity.id,
                type: activity.type,
                description: activity.descripcion,
                startDate: activity.fecha_inicio,
                endDate: activity.fecha_fin,
                totalPlaces: activity.plazas_totales,
                price: activity.price,
                location: activity.location,
                image: `http://localhost:3080/images/${activity.image}`,
            }))
        );
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createActivity,
    updateActivity,
    getActivityInfo,
    uploadActivityImage,
    searchActivities,
    getUsersActivities,
};
