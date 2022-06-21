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
        rank: 'default'
    })
    await domainUser.save();
    return domainUser;
}

exports.updateDomainUser = async (req) => {
    const { listenerId, domainId } = req.params

    const domainUserExists = await req.db.DomainUser.findOne({
        activeDomain: domainId,
        listenerId
    })
    
    if(domainUserExists === null) {
        throw new StatusCodeException('Domain user does not exist', 404);
    }

    const { score, events, achievements, latestMessage, active, rank } = req.body;

    if(active !== undefined) {
        domainUserExists.active = active;
    }
    
    if(latestMessage) {
        domainUserExists.latestMessage = latestMessage;
    }

    if(score) {
        domainUserExists.score = score;
    }

    if(events) {
        domainUserExists.events = events;
    }

    if(achievements) {
        domainUserExists.achievements = achievements
    }

    if(rank) {
        domainUserExists.rank = rank
    }

    await domainUserExists.save();

    return domainUserExists
}

exports.getLeaderboardForDomain = async (req) => {
    const { domainId } = req.params;
    const domainUser = await req.db.DomainUser.find({
        activeDomain: domainId,
    }, {
        __v: 0,
        events: 0,
        achievements: 0,
    }).sort({'score': -1}).limit(100);
    if(domainUser.length === 0) {
        throw new StatusCodeException('You don\'t have any users yet', 404);
    }
    return domainUser
}