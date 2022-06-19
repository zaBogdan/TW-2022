const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;
const { domainUserSchema } = require('../validation');

exports.createDomainUser = async (req) => {
    const { listenerId, domainId } = req.params
    console.log(listenerId, domainId)
    
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