const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const StatusCodeException = require('shared').exceptions.StatusCodeException;

exports.getDomainById = async (req) => {
    const domains = await req.db.Domain.findOne({
        _id: req?.params?.id,
        userId: req.locals.token.userId
    }, {
        __v: 0
    })
    
    if(domains === null) {
        throw new StatusCodeException('Domain doesn\'t exists.', 404)
    }
    return domains;
}

exports.putDomainById = async (req) => {
    console.log('Ids: ', req.params)
    console.log('JWToken data is: ', req.locals.token);
    // TODO: To be implemented
    return null;
}

exports.deleteDomainById = async (req) => {
    const domain = await req.db.Domain.deleteOne({
        _id: req?.params?.id,
        userId: req.locals.token.userId
    })
    console.log(domain)
    return null;
}

exports.getAllDomains = async (req) => {
    const domains = await req.db.Domain.find({
        userId: req?.locals?.token?.userId
    }, {
        __v: 0,
        activeUrl: 0,
        apiKey: 0,
        users: 0
    })
    if(domains.length === 0) {
        throw new StatusCodeException('You don\'t have any domains yet.', 200)
    }
    return domains;
}

exports.createNewDomain = async (req) => {
    const { name, activeUrl } = req.body
    console.log(req.locals.token.userId)

    const domainExists = await req.db.Domain.findOne({
        name,
        userId: req.locals.token.userId
    })

    if(domainExists !== null) {
        throw new StatusCodeException(`Domain with name ${name} already exists. Try to be more creative`, 400)
    }
    const domain = new req.db.Domain({
        userId: req.locals.token.userId,
        name,
        users: [],
        activeUrl,
        registeredAt: new Date(),
        active: req?.body?.active ? req.body.active : true,
        apiKey: uuid().replace(/-/gi, ''),
    })

    await domain.save();
    return domain;
}

exports.triggerEventForDomain = async (req) => {
    console.log('Ids: ', req.params)
    console.log('JWToken data is: ', req.locals.tokens);
    // TODO implement this later
    return null;
}