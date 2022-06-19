const jwt = require('jsonwebtoken');

exports.validateToken = async (req) => {
    // no validation needed here. just retrieve data from token
    req.locals.token = jwt.decode(req.headers.authorization.split(' ')[1]);
}