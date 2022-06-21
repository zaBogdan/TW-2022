const Joi = require('joi').extend(require('@joi/date'));

exports.triggerEvent = Joi.object({
    event: Joi.string().required(),
    listenerId: Joi.string().required()
})