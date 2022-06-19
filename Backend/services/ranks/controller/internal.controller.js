const { internalService } = require('../services');

exports.getRankByName = async (req, res, next) => {
    try {
        const rank = await internalService.getRankByName(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched rank',
            data: {
                rank
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get rank using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}