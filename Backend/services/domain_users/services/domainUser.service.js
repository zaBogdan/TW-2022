const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { domainUserSchema } = require('../validation');

exports.getUserByListenerId = async (req) => {
    //TODO: ADD AUTHORIZATION BASED ON USERID
    const { listenerId } = req.params
    const domainUser = await req.db.DomainUser.findOne({
        listenerId: listenerId
    }, {
        __v: 0
    })
    if(domainUser === null) {
        throw new StatusCodeException('Domain user not found', 404)
    }
    return domainUser;
}

exports.getDomainUserLeaderboard = async (req) => {
    //TODO: ADD AUTHORIZATION BASED ON USERID

    const { domainId } = req.params
    console.log(domainId)
    
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
    //TODO: ADD AUTHORIZATION BASED ON USERID

    const { listenerId } = req.params
    console.log(listenerId)

    const domainUser = await req.db.DomainUser.findOne({
        listenerId
    });

    if(domainUser === null) {
        throw new StatusCodeException('Domain user not found', 404);
    }
    await domainUserSchema.updateUser.validateAsync(req.body)
    const { active } = req.body

    domainUser.active = active ?? domainUser.active;

    await domainUser.save();

    return domainUser;
}

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
        achievemnts: [],
        rank: ""
    })
    await domainUser.save();
    return domainUser;
}