const Joi = require('joi');

exports.updateRule = Joi.object({
    name: Joi.string(),
    score: Joi.number().min(0).max(10000),
}).min(1)

exports.createRule = Joi.object({
    name: Joi.string().required(),
    reward: Joi.object({
        type: Joi.string().valid('Achievements', 'RankUp', 'RankDown', 'Score').required(),
        score: Joi.when('type', {
            is: Joi.string().valid('Score'),
            then: Joi.number().min(0).max(10000).required()
        }),
        name: Joi.when('type', {
            is: Joi.string().valid('Achievements', 'RankUp', 'RankDown',),
            then: Joi.string().required()
        }),
    }),
    match: Joi.string().valid('all', 'any').required(),
    rules: Joi.array().items(Joi.object({
        event: Joi.string().required(),
        comparator: Joi.string().valid('gte', 'gt', 'lte', 'lt', 'eq', 'neq').required(),
        value: Joi.number().min(0).max(1000).required()
    })).required()
})