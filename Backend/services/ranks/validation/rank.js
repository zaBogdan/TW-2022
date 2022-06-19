const Joi = require('joi');

exports.updateRank = Joi.object({
    name: Joi.string(),
    score: Joi.number().min(0).max(10000),
    rankTo: Joi.string(),
}).min(1)

exports.createRank = Joi.object({
    name: Joi.string().required(),
    score: Joi.number().min(0).max(10000).required(),
    rankTo: Joi.string().default('default'),
})