const { Token } = require('./authentication');

exports.validateToken = async (req) => {
    if(req?.headers?.authorization === undefined) {
        throw new StatusCodeException('You must be authenticated to use this route', 403);
    }
    const [type, token] = req.headers.authorization.split(' ');

    if(type !== 'Bearer') {
        throw new StatusCodeException('Invalid authorization token type. Allowed types: Bearer', 403);
    }
    
    const [data, valid] = await Token.validate(token);
    
    if(valid !== true) {
        throw new StatusCodeException('Token is already expired. Try to login', 403);
    }

    return data;
}