const { debug } = require('shared').utils.logging;
const { v4: uuid } = require('uuid');
const { Password, Token } = require('../modules');
const StatusCodeException = require('shared').exceptions.StatusCodeException;

exports.handleEmailRegister = async (req) => {
    const { email, password, type } = req.body;
    const emailExists = await req.db.Auth.findOne({ email })

    // TODO: This must be changed in future when we'll support OAuth
    if(type !== 1) {
        throw new StatusCodeException('These are the following types allowed: [ 1 ]. More to come later', 400)
    }
    if(emailExists !== null) {
        throw new StatusCodeException('Email already exists', 500);
    }
    const user = new req.db.Auth({
        userId: uuid().replace(/-/gi, ''),
        type,
        email: email,
        password: await Password.generate(password)
    })

    await user.save()

    return email;
}

exports.handleAuthentication = async(req) => {
    const { email, password } = req.body;
    const user = await req.db.Auth.findOne({ email })
    if(user === null) {
        throw new StatusCodeException('Email and password don\'t match', 401);
    }
    
    if(await Password.verify(password, user.password) !== true) {
        throw new StatusCodeException('Email and password don\'t match', 401);
    }
    
    if(user.active === false || user.suspended === true) {
        throw new StatusCodeException('Your account has been suspeneded or is deactivated', 403);
    }

    const accessToken = await Token.generate({
        userId: user.userId,
        email: user.email,
        fresh: true,
        type: 'access'
    }, {
        expiresIn: '1h'
    })

    const refreshToken = await Token.generate({
        userId: user.userId,
        email: user.email,
        type: 'refresh',
    }, {
        expiresIn: '24h'
    })
 
    return [accessToken, refreshToken];
}

exports.handleRefreshSession = async(req) => {
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
    if(data.type !== 'refresh') {
        throw new StatusCodeException('Invalid token type. You must use \'REFRESH\' tokens.', 403);
    }

    const accessToken = await Token.generate({
        userId: data.userId,
        email: data.email,
        fresh: false,
        type: 'access'
    }, {
        expiresIn: '1h'
    })

    const refreshToken = await Token.generate({
        userId: data.userId,
        email: data.email,
        type: 'refresh',
    }, {
        expiresIn: '24h'
    })

    return [accessToken, refreshToken]
}