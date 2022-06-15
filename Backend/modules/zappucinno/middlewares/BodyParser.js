'use strict'
const utils = require('../utils');

const json = (req, res, next) => {
    if(req.headers['content-type'] === 'application/json') {
        req.body = JSON.parse(req.body);
    } else {
        debug('Warning: Content-Type is not application/json');
    }
}

module.exports = {
    json
}