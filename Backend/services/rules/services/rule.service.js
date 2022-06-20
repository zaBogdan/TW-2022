const { debug } = require('shared').utils.logging;
const StatusCodeException = require('shared').exceptions.StatusCodeException;
const { ruleSchema } = require('../validation');
const httpRequest = require('shared').modules.internal_comm.http.request;
const { ACHIEVEMENTS, DOMAIN, RANKS, EVENT } = require('shared').config.services;

exports.getRuleById = async (req) => {
    const { ruleId } = req.params;
    const { userId } = req.locals.token;
    
    const rule = (await req.db.Rule.findOne({
        _id: ruleId,
    }, {
        involvedEvents: 0
    })).toObject();

    if(rule === null) {
        throw new StatusCodeException('This rule doesn\'t exists.', 404);
    }

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${rule.activeDomain}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }


    if(rule.reward.type === 'Score') {
        // nth to do here
    } else if(rule.reward.type === 'Achievements') {
        try {
            const data = await httpRequest(req, 'get', `${ACHIEVEMENTS}/achievement/${rule.reward.objectId}`)
            rule.reward.name = data.data.achievement._id;
            delete rule.reward.objectId;
            delete rule.reward.score;
        } catch(e) {
            console.log(e)
        }
    } else if(rule.reward.type.startsWith('Rank')) {
        try {
            const data = await httpRequest(req, 'get', `${RANKS}/rank/${rule.reward.objectId}`)
            rule.reward.name = data.data.rank.name;
            delete rule.reward.objectId;
            delete rule.reward.score;
        } catch(e) {
            console.log(e)
        }
    }

    for(const _rule of rule.rule) {
        try {
            const data = await httpRequest(req, 'get', `${EVENT}/event/${_rule.event}`)
            _rule.event = data.data.event.name;
        } catch(e) {
            console.log(e)
        }
    }

    return rule;
}

exports.getRulesForDomain = async (req) => {
    const { domainId } = req.params;
    const { userId } = req.locals.token;
    
    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${domainId}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }

    const rules = await req.db.Rule.find({ 
        activeDomain: domainId
    }, {
        __v: 0,
        involvedEvents: 0,
        rule: 0,
        match: 0,
        reward: 0,
    });

    if(rules.length === 0) {
        throw new StatusCodeException('You don\'t have any rules yet.', 404);
    }

    return rules;
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

    if(await req.db.Rule.countDocuments({ activeDomain: domainId, name }) !== 0) {
        throw new StatusCodeException('This rule already exists.', 400);
    }

    if(reward.type === 'Score'){
        // nth to do here
    } else if(reward.type === 'Achievements') {
        try {
            const data = await httpRequest(req, 'post', `${ACHIEVEMENTS}/internal/achievement/byName`, {
                domain: domainId,
                name: reward.name
            })
            reward.objectId = data.data.achievement._id;
            delete reward.name;
        } catch(e) {
            debug('[addRuleToDomain - Achievements] Something didn\'t work', e);
            throw new StatusCodeException('The achievement with specified name doesn\'t exists',400)
        }
    } else if(reward.type.startsWith('Rank')) {
        try {
            const data = await httpRequest(req, 'post', `${RANKS}/internal/rank/byName`, {
                domain: domainId,
                name: reward.name
            })
            reward.objectId = data.data.rank._id;
            delete reward.name;
        } catch(e) {
            debug('[addRuleToDomain - Rank] Something didn\'t work', e);
            throw new StatusCodeException('The rank with specified name doesn\'t exists',400)
        }
    }

    if(rules.length > 7) {
        throw new StatusCodeException('You can have up to 7 chained rules.', 400);
    }

    const involvedEvents = [];

    for(const rule of rules) {
        try {
            const data = await httpRequest(req, 'post', `${EVENT}/internal/event/byName`, {
                domain: domainId,
                name: rule.event
            })
            rule.event = data.data.event._id;
            involvedEvents.push(rule.event);
        } catch(e) {
            debug('[addRuleToDomain - Event] Something didn\'t work', e);
            throw new StatusCodeException(`The event with name '${rule.event}' doesn\'t exists`,400)
        }
    }

    const rule = new req.db.Rule({
        activeDomain: domainId,
        name,
        reward,
        involvedEvents,
        reward,
        match,
        rule: rules
    })

    await rule.save();
    
    return rule;
}

exports.updateRuleById = async (req) => {
    const { ruleId } = req.params;
    const { userId } = req.locals.token;
    
    const ruleDB = await req.db.Rule.findOne({
        _id: ruleId,
    });

    if(ruleDB === null) {
        throw new StatusCodeException('This rule doesn\'t exists.', 404);
    }

    const domainId = ruleDB.activeDomain;

    const body = await httpRequest(req, 'get', `${DOMAIN}/domain/${ruleDB.activeDomain}`)
    if(body?.data?.domain?.userId !== userId) {
        throw new StatusCodeException('This domain doesn\'t exists.', 404);
    }
    await ruleSchema.updateRule.validateAsync(req.body);
    const { name, match, reward, rules } = req.body;

    if(name) {
        if(await req.db.Rule.countDocuments({ activeDomain: domainId, name }) !== 0) {
            throw new StatusCodeException('This rule already exists.', 400);
        }
        ruleDB.name = name ?? ruleDB.name;
    }
    
    if(reward) {
        if(reward.type === 'Score'){
            // nth to do here
        } else if(reward.type === 'Achievements') {
            try {
                const data = await httpRequest(req, 'post', `${ACHIEVEMENTS}/internal/achievement/byName`, {
                    domain: domainId,
                    name: reward.name
                })
                reward.objectId = data.data.achievement._id;
                delete reward.name;
            } catch(e) {
                debug('[addRuleToDomain - Achievements] Something didn\'t work', e);
                throw new StatusCodeException('The achievement with specified name doesn\'t exists',400)
            }
        } else if(reward.type.startsWith('Rank')) {
            try {
                const data = await httpRequest(req, 'post', `${RANKS}/internal/rank/byName`, {
                    domain: domainId,
                    name: reward.name
                })
                reward.objectId = data.data.rank._id;
                delete reward.name;
            } catch(e) {
                debug('[addRuleToDomain - Rank] Something didn\'t work', e);
                throw new StatusCodeException('The rank with specified name doesn\'t exists',400)
            }
        }
    
        if(rules.length > 7) {
            throw new StatusCodeException('You can have up to 7 chained rules.', 400);
        }

        ruleDB.reward = reward;
    }

    if(rules) {
        const involvedEvents = [];

        for(const rule of rules) {
            try {
                const data = await httpRequest(req, 'post', `${EVENT}/internal/event/byName`, {
                    domain: domainId,
                    name: rule.event
                })
                rule.event = data.data.event._id;
                involvedEvents.push(rule.event);
            } catch(e) {
                debug('[addRuleToDomain - Event] Something didn\'t work', e);
                throw new StatusCodeException(`The event with name '${rule.event}' doesn\'t exists`,400)
            }
        }

        ruleDB.involvedEvents = involvedEvents;
        ruleDB.rule = rules;
    }

    ruleDB.match = match ?? ruleDB.match;
    await ruleDB.save();

    return ruleDB;
}
