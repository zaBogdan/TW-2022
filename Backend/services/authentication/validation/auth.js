const Joi = require('joi');

exports.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

exports.register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    type: Joi.number().valid(1)
})