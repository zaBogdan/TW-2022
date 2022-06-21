 const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;
const { domainUserSchema } = require('../validation');

exports.getUserByListenerId = async (req) => {
    const { listenerId } = req.params
    const { userId } = req.locals.token;
    const domainUser = await req.db.DomainUser.findOne({
        listenerId: listenerId
    }, {
        __v: 0
    })
    if(domainUser === null) {
        throw new StatusCodeException('Domain user not found', 404)
    }

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainUser.activeDomain}`)
    if(body.data.domain.userId !== userId) {
        throw new StatusCodeException('Domain user not found', 404);
    }
    return domainUser;
}

exports.getDomainUserLeaderboard = async (req) => {
    const { domainId } = req.params
    const { userId } = req.locals.token;
    
    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainId}`)
    if(body.data.domain.userId !== userId) {
        throw new StatusCodeException('Domain user not found', 404);
    }

    const domainUsers = await req.db.DomainUser.find({
        activeDomain: domainId
    }, {
        events: 0,
        achievements: 0,
        __v: 0,
        _id: 0
    }).sort({score: 1}).limit(10);

    return domainUsers;
}

exports.getDomainUserHistory = async (req) => {
    throw new StatusCodeException('This feature is currently under development', 501)
    return null;
}

exports.updateUserByListenerId = async (req) => {
    const { listenerId } = req.params
    console.log(listenerId)

    const domainUser = await req.db.DomainUser.findOne({
        listenerId
    });

    if(domainUser === null) {
        throw new StatusCodeException('Domain user not found', 404);
    }
    const { userId } = req.locals.token;
    
    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainUser.activeDomain}`)
    if(body.data.domain.userId !== userId) {
        throw new StatusCodeException('Domain user not found', 404);
    }
    await domainUserSchema.updateUser.validateAsync(req.body)
    const { active } = req.body

    domainUser.active = active ?? domainUser.active;

    await domainUser.save();

    return domainUser;
}