const Joi = require('joi');

exports.updateAchievement = Joi.object({
    name: Joi.string(),
    score: Joi.number().min(0).max(1000)
}).min(1)

exports.createAchievement = Joi.object({
    name: Joi.string().required(),
    score: Joi.number().min(0).max(1000).required(),
})