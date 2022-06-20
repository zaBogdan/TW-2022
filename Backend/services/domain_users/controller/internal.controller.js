const { internalService } = require('../services');

exports.createDomainUser = async (req, res, next) => {
    try {
        const domainUser = await internalService.createDomainUser(req);
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

exports.updateDomainUser = async (req, res, next) => {
    try {
        const domainUser = await internalService.updateDomainUser(req);
        return res.status(200).json({
            success: true,
            message: `Successfully updated domain user with id '${domainUser?.listenerId}'`,
        });
    }catch(e) {
        console.error(e)
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update domain user. Error: ' + e?.message || 'Internal server error', 
        });
    }
}