const Joi = require('joi').extend(require('@joi/date'));

exports.updateProfile = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    dateOfBirth: Joi.date().format('DD/MM/YYYY').raw(),
}).min(1)

exports.createProfile = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    dateOfBirth: Joi.date().format('DD/MM/YYYY').raw().required(),
})