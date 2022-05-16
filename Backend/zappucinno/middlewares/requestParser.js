'use strict';
const parser = module.exports = exports = function() {
    const reqParser = function(req, res, next) {
        parser.getQueryParams(req);
        parser.getAuthenticationToken(req);
        parser.addLocale(req);
        parser.addResponseTags(res);
    }

    return reqParser;
}

parser.getQueryParams = function(req) {
    req.query = {};

    const queryString = req.url.split('?')[1];
    if(queryString === undefined) {
        return;
    }

    queryString.split('&').forEach(pair => {
        pair = pair.split('=');
        try {
            req.query[pair[0]] = decodeURI(pair[1]);
          } catch (e) { 
            // catches a malformed URI
            console.error(e);
          }
    });
}

parser.getAuthenticationToken = function(req) {
    const authToken = req.headers['authorization'];
    if(authToken === undefined) {
        return;
    }

    const token = authToken.split(' ')[1];
    req.token = token;
}

parser.addLocale = function(req) {
    // use this to store values from a middleware to another
    req.locale = {};
}

parser.addResponseTags = function (res) {
    res.setHeader('X-Powered-By', 'Zappucinno');
}