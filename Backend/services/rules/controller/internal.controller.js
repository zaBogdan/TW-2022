const { internalService } = require('../services');

exports.getRulesByContainingEvent = async (req, res, next) => {
    try {
        const rules = await internalService.getRulesByContainingEvent(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched rule',
            data: {
                rules
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get rule using event. Error: ' + e?.message || 'Internal server error', 
        });
    }
}