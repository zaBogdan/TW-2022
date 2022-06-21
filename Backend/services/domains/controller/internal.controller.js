const { internalService } = require('../services');

exports.getDomainByIdAndApiKey = async (req, res,next) => {
    try {
        const domain = await internalService.getDomainByIdAndApiKey(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched domain',
            data: {
                domain
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get domain using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
