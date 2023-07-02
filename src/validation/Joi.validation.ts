import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(3).max(255).required(),
});

export const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(5).required(),
});
