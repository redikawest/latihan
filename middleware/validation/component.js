import Joi from "joi"

export const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().empty('')
    })
}

export const update = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().empty('')
    })
}