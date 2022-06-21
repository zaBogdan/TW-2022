const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { achievementSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

exports.getAchievementByName = async (req) => {
    const { name, domain } = req.body;
    const userId = req.locals.token.userId;

    const achievement = await req.db.Achievement.findOne({
        name,
        activeDomain: domain
    }, {
        __v: 0,
    })

    if(achievement ===  null) {
        throw new StatusCodeException('This achievement doesn\'t exists.', 404);
    }

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${achievement.activeDomain}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This achievement doesn\'t exists.', 404);
    }

    return achievement;
}

exports.getAchievementById = async (req) => {
    const { achievementId, domainId } = req.params

    const achievement = await req.db.Achievement.findOne({
        _id: achievementId,
        activeDomain: domainId
    }, {
        __v: 0,
    })

    if(achievement ===  null) {
        throw new StatusCodeException('This achievement doesn\'t exists.', 404);
    }
    
    return achievement;
}