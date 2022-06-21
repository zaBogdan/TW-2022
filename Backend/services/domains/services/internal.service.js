const StatusCodeException = require('shared').exceptions.StatusCodeException;

exports.getDomainByIdAndApiKey = async (req) => {
    const domain = await req.db.Domain.findOne({
        _id: req?.params?.domainId,
        apiKey: req?.params?.apiKey,
    }, {
        __v: 0
    })
    
    if(domain === null) {
        throw new StatusCodeException('Domain doesn\'t exists.', 404)
    }
    return domain;
}

exports.getDomainByApiKey = async (req) => {
    const domain = await req.db.Domain.findOne({
        apiKey: req?.params?.apiKey,
    }, {
        __v: 0
    })
    
    if(domain === null) {
        throw new StatusCodeException('Domain doesn\'t exists.', 404)
    }
    return domain;
}