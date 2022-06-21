const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { rankSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

exports.getRankById = async (req) => {
    const rankId = req.params.id;
    const userId = req.locals?.token?.userId;

    const rank = await req.db.Rank.findOne({
        _id: rankId
    }, {
        __v: 0,
    });

    if(rank === null) {
        throw new StatusCodeException('This rank doesn\'t exists.', 404);
    }

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${rank.activeDomain}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This rank doesn\'t exists.', 404);
    }

    return rank;
}
exports.getRanksForDomain = async (req) => {
    const domainId = req.params.domainId;
    const userId = req.locals?.token?.userId;

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainId}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }

    const rank = await req.db.Rank.find({
        activeDomain: domainId
    }, {
        __v: 0,
    });

    return rank;
}
exports.addNewRankToDomain = async (req) => {
    const domainId = req.params.domainId;
    const userId = req.locals?.token?.userId;

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainId}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }

    await rankSchema.createRank.validateAsync(req.body);
    const { name, score, rankTo } = req.body;
    
    const rankWithSameName = await req.db.Rank.countDocuments({
        name,
        activeDomain: domainId
    });

    if(rankWithSameName !== 0)  {
        throw new StatusCodeException('This rank already exists.', 400);
    }

    if(rankTo && rankTo !== 'default') {
        const rankExists = await req.db.Rank.countDocuments({
            name: rankTo,
            activeDomain: rank.activeDomain
        })
        if(rankExists === 0) {
            throw new StatusCodeException('Rank that you are trying to set in `rankTo` field doesn\'t exists.', 400);
        }
    }

    const rank = new req.db.Rank({
        name,
        score,
        rankTo: (rankTo ? rankTo : 'default'),
        activeDomain: domainId
    })
    await rank.save();
    return rank;
}
exports.updateRankById = async (req) => {
    const rankId = req.params.id;
    const userId = req.locals?.token?.userId;

    const rank = await req.db.Rank.findOne({
        _id: rankId
    }, {
        __v: 0,
    });

    if(rank === null) {
        throw new StatusCodeException('This rank doesn\'t exists.', 404);
    }

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${rank.activeDomain}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This rank doesn\'t exists.', 404);
    }

    await rankSchema.updateRank.validateAsync(req.body);
    const { name, score, rankTo } = req.body;

    if(name && name !== rank.name) {
        const rankExists = await req.db.Rank.countDocuments({
            name,
            activeDomain: rank.activeDomain
        })
        if(rankExists !== 0) {
            throw new StatusCodeException('Rank with this name already exists. Try to be more creative.', 400);
        }
        rank.name = name;
    }

    if(score) {
        rank.score = score;
    }

    if(rankTo && rankTo !== 'default') {
        const rankExists = await req.db.Rank.countDocuments({
            name: rankTo,
            activeDomain: rank.activeDomain
        })
        if(rankExists === 0) {
            throw new StatusCodeException('Rank that you are trying to set in `rankTo` field doesn\'t exists.', 400);
        }
        rank.rankTo = rankTo;
    }

    await rank.save();

    return rank;
}
exports.deleteRankById = async (req) => {
    const rankId = req.params.id;
    const userId = req.locals?.token?.userId;

    const rank = await req.db.Rank.findOne({
        _id: rankId
    }, {
        __v: 0,
    })
    if(rank === null) {
        throw new StatusCodeException('This rank doesn\'t exists.', 404);
    }

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${rank.activeDomain}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This rank doesn\'t exists.', 404);
    }

    await req.db.Rank.deleteOne({
        _id: rankId,
        activeDomain: rank.activeDomain,
    });

    return rank;
}