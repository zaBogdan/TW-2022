const jwt = require('jsonwebtoken');

exports.validateToken = async (req) => {
    // no validation needed here. just retrieve data from token
    console.log('hello world')
    const token  = req?.headers?.authorization?.split(' ')?.[1]
    if(token !== undefined) {
        req.locals.token = jwt.decode(token);
    }
}