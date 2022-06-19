const { validateToken } = require('../modules');

exports.getDataFromToken = async (req, res, next) => {
    await validateToken(req);
}