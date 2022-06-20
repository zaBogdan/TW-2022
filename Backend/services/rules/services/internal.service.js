const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { rankSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

exports.getRulesByContainingEvent = async (req) => {
    const { eventId } = req.params;

    const rules = await req.db.Rule.find({
        involvedEvents : eventId
    })

    if(rules.length === 0) {
        throw new StatusCodeException('No rules found', 404);
    }
    return rules;
}