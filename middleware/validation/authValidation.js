import Joi from "joi"

export const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}

export const register = {
    body: Joi.object().keys({
        identityType: Joi.string().required(),
        identityId: Joi.string().required(),
        name: Joi.string().required(),
        salutation: Joi.string().required(),
        sex: Joi.string().required(),
        isMarried: Joi.boolean().required(),
        birthPlace: Joi.string(),
        birthDate: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        religion: Joi.string().optional(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required()
    })
}

export const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().required().email()
    })
}

export const requestToken = {
    body: Joi.object().keys({
        email: Joi.string().required().email()
    })
}

export const verifyToken = {
    body: Joi.object().keys({
        email: Joi.string().required().email()
    })
}