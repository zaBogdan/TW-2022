const Joi = require('joi').extend(require('@joi/date'));

exports.updateUser = Joi.object({
    active: Joi.boolean(),
}).min(1)
