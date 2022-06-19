const Joi = require('joi');

exports.updateRule = Joi.object({
    name: Joi.string(),
    score: Joi.number().min(0).max(10000),
}).min(1)

exports.createRule = Joi.object({
    name: Joi.string().required(),
    score: Joi.number().min(0).max(10000).required(),
    rankTo: Joi.string().default('default'),
})