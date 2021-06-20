const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersRepo = require('../repositories/users-repo');

async function register(req, res, next) {
    try {
        const { name, email, password, repeatedPassword } = req.body;

        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).required(),
            repeatedPassword: Joi.string().min(5).max(20).required(),
        });

        await schema.validateAsync(req.body);

        if (password !== repeatedPassword) {
            const err = new Error(
                'Password y repeatedPassword deben coincidir'
            );
            err.httpcode = 400;

            throw err;
        }

        const user = await usersRepo.findUserByEmail(email);

        if (user) {
            const err = new Error(`Ya existe un usuario con email: ${email}`);
            err.httpcode = 409;

            throw err;
        }

        const passwordHash = await bcrypt.hash(password, 10); // no se puede guardar en base de datos, lo trasnformamos a churro

        const createdUser = await usersRepo.createUser({
            name,
            email,
            password: passwordHash,
        });

        const tokenPayload = {
            // lógica para una vez te registras estar ya logueado tb
            id: createdUser.id,
            role: createdUser.role,
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d',
        });

        res.status(201);
        res.send({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            token,
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).required(),
        });

        await schema.validateAsync({ email, password });

        const user = await usersRepo.findUserByEmail(email);

        if (!user) {
            const error = new Error('No existe el usuario');
            error.httpcode = 401;

            throw error;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const error = new Error('El password no es válido');
            error.httpcode = 401;

            throw error;
        }

        const tokenPayload = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d',
        });

        res.send({
            id: user.id,
            token,
            name: user.name,
            role: user.role,
        });
    } catch (err) {
        next(err);
    }
}

async function updatePassword(req, res, next) {
    try {
        const { id } = req.params;
        const userIdToken = req.auth.id; // no se valida, ya lo está al estar logueado con el ValidateAuth.
        const { newPassword, repeatedNewPassword } = req.body;
        const idSchema = Joi.number().required();
        const schema = Joi.object({
            newPassword: Joi.string().min(5).max(20).required(),
            repeatedNewPassword: Joi.string().min(5).max(20).required(),
        });
        await idSchema.validateAsync(id);
        await schema.validateAsync(req.body);

        if (id != userIdToken) {
            const error = new Error('id usuario inválido');
            error.httpcode = 401;

            throw error;
        }
        if (newPassword != repeatedNewPassword) {
            const error = new Error('contraseña no coincide');
            error.httpcode = 401;

            throw error;
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        await usersRepo.updatePassword({
            id,
            newPasswordHash,
        });

        res.status(201);
        res.send({
            message: 'Contraseña actualizada correctamente',
        });
    } catch (err) {
        next(err);
    }
}

async function updateUserInfo(req, res, next) {
    try {
        const { id } = req.params; // recupero id de la url

        const userIdToken = req.auth.id; //propiedad auth.id, no es objeto, no hace falta destruct

        const { name, email } = req.body;

        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email().required(),
        });

        const idSchema = Joi.number().required();

        await idSchema.validateAsync(id);
        await schema.validateAsync(req.body);

        if (id != userIdToken) {
            const error = new Error('id usuario inválido');
            error.httpcode = 401;

            throw error;
        }

        await usersRepo.updateUserInfo({
            id,
            name,
            email,
        });

        res.status(201);
        res.send({
            message: 'Info de usuario actualizada correctamente',
        });
    } catch (err) {
        next(err);
    }
}

async function getUserInfo(req, res, next) {
    try {
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

        const user = await usersRepo.findUserById(userId);
        res.status(200);
        res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            image: `http://localhost:3080/images/${user.image}`,
        });
    } catch (err) {
        next(err);
    }
}

async function uploadUsersImage(req, res, next) {
    try {
        const tokenUserId = req.auth.id;
        const userId = req.params.id;
        const { file } = req;

        const schema = Joi.number().positive().required();

        await schema.validateAsync(userId);
        await schema.validateAsync(tokenUserId);

        if (tokenUserId != userId) {
            const error = new Error('id usuario inválido');
            error.httpcode = 401;

            throw error;
        }

        const url = file.filename;

        await usersRepo.updateUserImage({
            userId,
            url,
        });

        res.status(201);
        res.send({
            message: 'Imagen de usuario actualizada correctamente',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    getUserInfo,
    updateUserInfo,
    uploadUsersImage,
    updatePassword,
};

//
