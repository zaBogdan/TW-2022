const {debug} = require('shared').utils.logging;
const servicesURL = require('shared').config.services;
const setup = require('../configs/setup');
const https = require('http');

exports.JWTAuth = async (req, res, next) => {
    if(req.method === 'OPTIONS') {
        res.status(200);
        res.end();
        return;
    }
    const path = req.url.split('?')[0];
    const headers = req.headers

    // checking if we have a public route here
    for(const _path of setup.OPEN_ROUTES) {
        if(_path.endsWith('/*')) {
            if(path.startsWith(_path.replace('/*', ''))) {
                return;
            }
        }else {
            if(path === _path) {
                return;
            }
        }
    }

    if(headers?.authorization === undefined) {
        return res.status(403).json({
            success: false,
            message: `You can\'t access '${path}'. Your tokens might have expired`,
        }).end();
    }

    // TODO: Change this to using latest api
    await new Promise((resolve, reject) => {
        const __req = https.get(`${servicesURL.AUTHENTICATION}/internal/validate`, {
            headers: {
                authorization: headers.authorization,
            }
        }, _res => {
            if(_res.statusCode === 200) {
                debug(`JWT authentication successful`);
                resolve()
            } else {
                res.status(403);
                reject(`You can\'t access '${path}'. Your tokens might have expired`)
            }
        })
        __req.on('error', function(error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error. Contact us at devops@gameify.biz',
            }).end()
        });
    })
}