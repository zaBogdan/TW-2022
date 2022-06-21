const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { apiSchema } = require('../validation');
const { amqp } = require('../modules');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN,DOMAIN_USER,ACHIEVEMENTS, EVENT } = require('shared').config.services;

exports.listenForDomainEvents = async (req) => {
    const {domainId} = req.params;
    const apiKey = req.headers['x-gameify-key'];
    
    if(apiKey === undefined || apiKey === null) {
        throw new StatusCodeException('You need to provide an api key to use this route.', 403);
    }

    const response = await httpRequest(req, 'get', `${DOMAIN}/internal/domain/byAPI/${domainId}/${apiKey}`);
    const domain = response.data.domain
    console.log(domain)
    if(domain === null) {
        throw new StatusCodeException('Invalid API Key or Domain id.', 404)
    }

    if(domain.active === false) {
        throw new StatusCodeException('Domain is not active.', 400)
    }

    await apiSchema.triggerEvent.validateAsync(req.body);
    const { event, listenerId } = req.body;

    const messageBody = {
        domainId,
        event,
        listenerId
    }

    await amqp.publisher(messageBody);
    return null;
}

exports.getDomainUserByListenerId = async (req) => {
    const {listenerId} = req.params;
    const apiKey = req.headers['x-gameify-key'];
    
    if(apiKey === undefined || apiKey === null) {
        throw new StatusCodeException('You need to provide an api key to use this route.', 403);
    }
    
    let response = await httpRequest(req, 'get', `${DOMAIN}/internal/domain/byAPIKey/${apiKey}`);
    const domain = response.data.domain

    response = await httpRequest({}, 'get', `${DOMAIN_USER}/internal/domain/user/${domain._id}/${listenerId}`);
    const { domainUser } = response.data;

    const achievements = []
    for(let achievement of domainUser.achievements) {
        response = await httpRequest({}, 'get', `${ACHIEVEMENTS}/internal/achievement/${domain._id}/${achievement}`);
        achievements.push(response.data.achievement)
    }
    domainUser.achievements = achievements;
    delete domainUser.events
    return domainUser;
}
exports.getLeaderboardForDomain = async (req) => {
    const apiKey = req.headers['x-gameify-key'];
    
    if(apiKey === undefined || apiKey === null) {
        throw new StatusCodeException('You need to provide an api key to use this route.', 403);
    }
    
    let response = await httpRequest(req, 'get', `${DOMAIN}/internal/domain/byAPIKey/${apiKey}`);
    const domain = response.data.domain

    response = await httpRequest({}, 'get', `${DOMAIN_USER}/internal/domain/user/leaderboard/${domain._id}`);
    const { leaderboard } = response.data;
    return leaderboard;
}

exports.updateDomainUserByListenerId = async (req) => {
    return null;
}

exports.getEventsForDomain = async (req) => {
    const {listenerId} = req.params;
    const apiKey = req.headers['x-gameify-key'];
    
    if(apiKey === undefined || apiKey === null) {
        throw new StatusCodeException('You need to provide an api key to use this route.', 403);
    }
    
    let response = await httpRequest(req, 'get', `${DOMAIN}/internal/domain/byAPIKey/${apiKey}`);
    const domain = response.data.domain

    response = await httpRequest({}, 'get', `${EVENT}/internal/event/mapping/${domain._id}`);
    const { events } = response.data;

    return events;
}