const { proxyRequest } = require('../modules');
const servicesURL = require('shared').config.services;

exports.forwardToDomainUsersService = async (req, res,next) => {
    try {
        return await proxyRequest(req, res, servicesURL.DOMAIN_USER); 
    }catch(e) {
        return res.status(500).json({
            success: false,
            message: 'Failed to access path. Error: '+e,
        });
    }

}