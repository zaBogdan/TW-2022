const Joi = require('joi');

exports.updateEvent = Joi.object({
    name: Joi.string(),
    active: Joi.boolean(),
}).min(1)

exports.createEvent = Joi.object({
    name: Joi.string().required(),
    active: Joi.boolean().default(true),
})