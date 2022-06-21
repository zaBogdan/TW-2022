const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { eventSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

exports.getEventByName = async (req) => {
    const userId = req?.locals?.token?.userId;
    const { name, domain } = req.body
    const event = await req.db.Event.findOne({
        name,
        activeDomain: domain
    }, {
        __v: 0
    })

    if(event === null) {
        throw new StatusCodeException('Failed to find event with specified id.', 404);
    }

    return event;
}

exports.getEventMapping = async (req) => {
    const { domainId } = req.params;
    const events = await req.db.Event.find({
        activeDomain: domainId
    }, {
        __v: 0
    })
    if(events === null) {
        throw new StatusCodeException('No events found', 404);
    }

    return events;
}