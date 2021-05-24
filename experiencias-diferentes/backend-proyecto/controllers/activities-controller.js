const Joi = require('joi');
const activitiesRepo = require('../repositories/activities-repo');
//const validate = require('../middlewares/validate-auth');

async function createActivity(req, res, next) {
    try {
        //const { role } = req.auth;
        /* 
         if (role !== 'admin') {
            const err = new Error('Solo los admins pueden crear una actividad');
            err.status = 403;
            throw err; 
        } 
  */
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

        const createdActivity = await activitiesRepo.createActivity({
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
        res.send();
    } catch (err) {
        next(err);
    }
}

async function updateActivity(req, res, next) {
    try {
        //const { role } = req.auth;
        const { id } = req.params;

        /* if (role !== 'admin') {
            const err = new Error(
                'Solo los admins pueden actualizar una actividad'
            );
            err.status = 403;
            throw err;
        }
 */
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

        const updatedActivity = await activitiesRepo.updateActivity({
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
        res.send();
    } catch (err) {
        next(err);
    }
}

async function getActivities(req, res, next) {
    try {
        const activities = await activitiesRepo.getActivities();
        res.send(activities);
    } catch (err) {
        next(err);
    }
}

async function getActivitiesByPrice(req, res, next) {
    try {
        const activities = await activitiesRepo.findActivitiesByPrice();
        res.send(activities);
    } catch (err) {
        next(err);
    }
}

async function getActivitiesByLocation(req, res, next) {
    try {
        const activities = await activitiesRepo.findActivitiesByLocation();
        res.send(activities);
    } catch (err) {
        next(err);
    }
}

async function getActivitiesByDate(req, res, next) {
    try {
        const activities = await activitiesRepo.findActivitiesByDate();
        res.send(activities);
    } catch (err) {
        next(err);
    }
}

async function getActivitiesByType(req, res, next) {
    try {
        const activities = await activitiesRepo.findActivitiesByType();
        res.send(activities);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createActivity,
    updateActivity,
    getActivities,
    getActivitiesByPrice,
    getActivitiesByLocation,
    getActivitiesByDate,
    getActivitiesByType,
};
