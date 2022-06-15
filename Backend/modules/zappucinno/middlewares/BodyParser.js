'use strict'
const utils = require('../utils');

const json = async (req, res, next) => {
    req.body = await new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (data) => {
            body += data;
            if(body.length > 1e6) {
                this.req.connection.destroy();
            }
        }).on('end', () => {
            return resolve(body);
        }).on('error', (err) => {
            return reject(err);
        })
    })

    if(req.headers['content-type'] === 'application/json') {
        req.body = JSON.parse(req.body);
    } else {
        debug('Warning: Content-Type is not application/json');
    }
}

module.exports = {
    json
}