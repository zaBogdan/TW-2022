const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { achievementSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

exports.getAchievementById = async (req) => {
    const achievementId = req.params.achievementId;
    const userId = req.locals.token.userId;

    const achievement = await req.db.Achievement.findOne({
        _id: achievementId
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

exports.getAchievementsForDomain = async (req) => {
    const domainId = req.params.domainId
    const userId = req.locals.token.userId;

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainId}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }

    const achievements = await req.db.Achievement.find({
        activeDomain: domainId
    }, {
        __v: 0,
        activeDomain: 0,
    })

    return achievements;
}

exports.addNewAchievementForDomain = async (req) => {
    const domainId = req.params.domainId
    const userId = req.locals.token.userId;

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainId}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }

    await achievementSchema.createAchievement.validateAsync(req.body)
    const { name, score } = req.body

    const achievement = new  req.db.Achievement({
        name,
        score,
        activeDomain: domainId,
    })
    
    await achievement.save()

    return achievement;
}

exports.updateAchievementById = async (req) => {
    const achievementId = req.params.achievementId;
    const userId = req.locals.token.userId;

    const achievement = await req.db.Achievement.findOne({
        _id: achievementId
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

    await achievementSchema.updateAchievement.validateAsync(req.body)
    const { name, score } = req.body

    if(name) {
        achievement.name = name;
    }

    if(score) {
        achievement.score = score;
    }

    await achievement.save();

    return achievement;
}

exports.deleteAchievementById = async (req) => {
    const achievementId = req.params.achievementId;
    const userId = req.locals.token.userId;

    const achievement = await req.db.Achievement.findOne({
        _id: achievementId
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

    await req.db.Achievement.deleteOne({
        _id: achievementId,
        activeDomain: achievement.activeDomain,
    });

    return  achievement; 
}