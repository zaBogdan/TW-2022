const Joi = require('joi');

exports.updateDomain = Joi.object({
    name: Joi.string(),
    active: Joi.boolean(),
    activeUrl: Joi.array().items(Joi.string()),
    users: Joi.array().items(Joi.string())
})

exports.createDomain = Joi.object({
    name: Joi.string().required(),
    active: Joi.boolean().default(true),
    activeUrl: Joi.array().items(Joi.string()).required(),
})