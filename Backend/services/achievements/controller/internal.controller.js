const { internalService } = require('../services');

exports.getAchievementByName = async (req, res, next) =>  {
    try {
        const achievement = await internalService.getAchievementByName(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched achievement',
            data: {
                achievement
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get achievement by name. Error: ' + e?.message || 'Internal server error', 
        });
    }
}