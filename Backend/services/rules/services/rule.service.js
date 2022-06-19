const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { ruleSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { ACHIEVEMENTS, DOMAIN, RANKS } = require('shared').config.services;

exports.getRuleById = async (req) => {
    return null;
}

exports.getRulesForDomain = async (req) => {
    return null;
}

exports.addRuleToDomain = async (req) => {
    const { userId } = req.locals.token;
    const { domainId } = req.params;

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainId}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }

    await ruleSchema.createRule.validateAsync(req.body);

    const { name, reward, match, rules } = req.body;
    if(reward.type === 'Score'){
    } else if(reward.type === 'Achievements') {
        try {
            const data = await httpRequest(req, 'post', `${ACHIEVEMENTS}/internal/achievement/byName`, {
                domain: domainId,
                name: reward.name
            })
            reward.objectId = data.data.achievement._id;
            delete reward.name;
        } catch(e) {
            debug('[addRuleToDomain] Something didn\'t work', e);
            throw new StatusCodeException('The achievement with specified name doesn\'t exists',400)
        }
    } else if(reward.type.startsWith('Rank')) {
        try {
            const data = await httpRequest(req, 'post', `${RANKS}/internal/rank/byName`, {
                domain: domainId,
                name: reward.name
            })
            console.log(data)
            reward.objectId = data.data.rank._id;
            delete reward.name;
        } catch(e) {
            debug('[addRuleToDomain] Something didn\'t work', e);
            throw new StatusCodeException('The rank with specified name doesn\'t exists',400)
        }
    }

    console.log(reward)
    // const rule = new req.db.Rule({
    //     activeDomain: domainId,
    //     name,
    //     reward
    // })

    // console.log(rule);

    return null;
}

exports.updateRuleById = async (req) => {
    return null;
}
