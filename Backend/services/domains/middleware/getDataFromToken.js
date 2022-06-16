const { validateToken } = require('../modules');

exports.getDataFromToken = async (req, res, next) => {
    const data = await validateToken(req);
    req.locals.tokens = data;
}