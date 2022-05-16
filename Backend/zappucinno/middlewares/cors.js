const url = require('url')

/**
 * 
 * @param {*} options 
 * @returns {Function} representing the middleware function for Zappucinno 
 */
module.exports = function(options) {
    console.log('Cors options: ', options);
    const cors = function(req, res, next) {
        console.log('URL:', req.url, req.headers.host, options)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    };

    return cors;
}