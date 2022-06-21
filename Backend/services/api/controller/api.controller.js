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

exports.getDomainUserByListenerId = async (req, res, next) => {
    try {
        const user = await apiService.getDomainUserByListenerId(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched domain user by listener id',
            data: {
                user
            }
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch domain user by listener id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.getLeaderboardForDomain = async (req, res, next) => {
    try {
        const leaderboard = await apiService.getLeaderboardForDomain(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched leaderboard',
            data: {
                leaderboard
            }
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to trigger event. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.updateDomainUserByListenerId = async (req, res, next) => {
    try {
        await apiService.updateDomainUserByListenerId(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully updated domain user',
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update domain user by listener id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.getEventsForDomain = async (req, res, next) => {
    try {
        const events = await apiService.getEventsForDomain(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched all events',
            data: {
                events
            }
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch events for domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}