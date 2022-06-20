const { internalService } = require('../services');

exports.findProfileBy = async (req, res, next) => {
    try {
        const user = await internalService.findProfileBy(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched user',
            data: {
                user
            } 
        });
    }catch(e) {
        console.error(e)
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch profile using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}