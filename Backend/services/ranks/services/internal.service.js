const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { rankSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { DOMAIN } = require('shared').config.services;

exports.getRankByName = async (req) => {
    const userId = req.locals?.token?.userId;

    const { name, domain } = req.body;

    const rank = await req.db.Rank.findOne({
        name,
        activeDomain: domain,
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