const jwt = require('jsonwebtoken');

exports.decodeToken = async (req, res, next) => {
    // no validation needed here. just retrieve data from token
    const token  = req?.headers?.authorization?.split(' ')?.[1]
    req.locals.token = {}
    if(token !== undefined) {
        req.locals.token = jwt.decode(token);
    }
}