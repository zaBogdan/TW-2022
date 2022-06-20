const { proxyRequest } = require('../modules');
const servicesURL = require('shared').config.services;

exports.forwardToRankService = async (req, res,next) => {
    try {
        return await proxyRequest(req, res, servicesURL.RANKS); 
    }catch(e) {
        return res.status(500).json({
            success: false,
            message: 'Failed to access path. Error: '+e,
        });
    }

}