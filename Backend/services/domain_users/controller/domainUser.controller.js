const { domainUserService } = require('../services');

exports.getUserByListenerId = async (req, res, next) => {
    try {
        const domainUser = await domainUserService.getUserByListenerId(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched domain',
            data: {
                domainUser
            } 
        });
    }catch(e) {
        console.error(e)
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch domain user using listener id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.getDomainUserLeaderboard = async (req, res, next) => {
    try {
        const domainUsers = await domainUserService.getDomainUserLeaderboard(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched top 10 leaderboard',
            data: {
                domainUsers
            } 
        });
    }catch(e) {
        console.error(e)
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch leaderboard for domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.getDomainUserHistory = async (req, res, next) => {
    try {
        const user = await domainUserService.getDomainUserHistory(req);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched domain user history',
            data: {
                user
            } 
        });
    }catch(e) {
        console.error(e)
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get domain user history using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.updateUserByListenerId = async (req, res, next) => {
    try {
        const domainUser = await domainUserService.updateUserByListenerId(req);
        return res.status(200).json({
            success: true,
            message: `Successfully ${domainUser?.active ? 'activated' : 'deactivated' } user with id '${domainUser?.listenerId}'`,
        });
    }catch(e) {
        console.error(e)
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update domain user using listener id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

/** THIS SHOULD BE IN INTERNAL. Maybe I will change it later */
exports.createDomainUser = async (req, res, next) => {
    try {
        const domainUser = await domainUserService.createDomainUser(req);
        return res.status(200).json({
            success: true,
            message: `Successfully created domain user with id '${domainUser?.listenerId}'`,
            data: {
                domainUser
            }
        });
    }catch(e) {
        console.error(e)
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to create domain user. Error: ' + e?.message || 'Internal server error', 
        });
    }
}