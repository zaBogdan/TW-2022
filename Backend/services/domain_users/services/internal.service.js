const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;
const { domainUserSchema } = require('../validation');

exports.createDomainUser = async (req) => {
    const { listenerId, domainId } = req.params
    
    const domainUserExists = await req.db.DomainUser.findOne({
        activeDomain: domainId,
        listenerId
    })
    
    if(domainUserExists !== null) {
        return domainUserExists
    }

    const domainUser = new req.db.DomainUser({
        listenerId,
        activeDomain: domainId,
        score: 0,
        events: {},
        achievements: [],
        rank: ''
    })
    await domainUser.save();
    return domainUser;
}

exports.updateDomainUser = async (req) => {
    const { listenerId, domainId } = req.params

    console.log(listenerId, domainId)
    
    const domainUserExists = await req.db.DomainUser.findOne({
        activeDomain: domainId,
        listenerId
    })
    
    if(domainUserExists === null) {
        throw new StatusCodeException('Domain user does not exist', 404);
    }

    const { score, events, achievements, latestMessage } = req.body;

    if(latestMessage) {
        domainUserExists.latestMessage = latestMessage;
    }

    if(score) {
        domainUserExists.score = score;
    }

    if(events) {
        domainUserExists.events = events;
    }

    if(achievements) [
        domainUserExists.achievements = achievements
    ]

    await domainUserExists.save();

    return domainUserExists
}