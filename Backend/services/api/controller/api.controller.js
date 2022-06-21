const { apiService } = require('../services');

exports.listenForDomainEvents = async (req, res, next) => {
    try {
        await apiService.listenForDomainEvents(req);
        return res.status(200).json({
            success: true,
            message: 'Entry registered successfully',
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to trigger event. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
