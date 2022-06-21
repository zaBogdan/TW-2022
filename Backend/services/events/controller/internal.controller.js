const { internalService } = require('../services');

exports.getEventByName = async (req, res, next) => {
    try {
        const event = await internalService.getEventByName(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched event',
            data: {
                event
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get event using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}


exports.getEventMapping = async (req, res, next) => {
    try {
        const events = await internalService.getEventMapping(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched events',
            data: {
                events
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get event using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}