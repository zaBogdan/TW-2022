const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { eventSchema } = require('../validation');

exports.getEventById = async (req) => {
    console.log(req.params.id)
    const userId = req.locals.token.userId;
    const eventId = req.params.id;

    const event = await req.db.Event.findOne({
        userId,
        _id: eventId
    }, {
        __v: 0
    })

    if(event === null) {
        throw new StatusCodeException('Failed to find event with specified id.', 404);
    }

    return event;
}
exports.getEventsForDomain = async (req) => {
    const domainId = req.params.domainId;
    const userId = req.locals.token.userId;

    const events = await req.db.Event.find({
        userId,
        activeDomain: domainId
    }, {
        __v: 0
    })

    if(events.length === 0) {
        throw new StatusCodeException('You currently don\'t have any events associated with this domain.', 200);
    }

    return events;
}
exports.addNewEventToDomain = async (req) => {
    await eventSchema.createEvent.validateAsync(req.body);
    const { name, active } = req.body;

    const domainId = req.params.domainId;
    const userId = req.locals.token.userId;

    const domainExists = await req.db.Domain.countDocuments({
        userId,
        _id: domainId
    })


    if(domainExists === 0) {
        throw new StatusCodeException('Domain that you are trying to link doesn\'t exists', 400)
    }

    const eventChecks = await req.db.Event.findOne({
        name,
        domainId,
        userId
    })
    if(eventChecks !== null) {
        throw new StatusCodeException('Event if specified name already exists', 400);
    }

    const event = new req.db.Event({
        activeDomain: domainId,
        name,
        active,
        userId: userId
    })

    await event.save();

    return event;
}
exports.updateEventById = async (req) => {
    const eventId = req.params.id;
    const userId = req.locals.token.userId;

    const event = await req.db.Event.findOne({
        _id: eventId,
        userId
    })

    if(event === null) {
        throw new StatusCodeException('Event with specified id doesn\'t exists.', 404);
    }

    await eventSchema.updateEvent.validateAsync(req.body);
    const { name, active } = req.body

    if(name) {
        event.name = name;
    }

    if(active) {
        event.active = active;
    }

    await event.save();

    return event;
}
exports.deleteEventById = async (req) => {
    const eventId = req.params.id;
    const userId = req.locals.token.userId;

    await req.db.Event.deleteOne({
        userId,
        _id: eventId
    }, {
        __v: 0
    })

    return eventId;
}