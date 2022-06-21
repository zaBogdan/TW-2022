const { domainService } = require('../services');

exports.getDomainById = async (req, res,next) => {
    try {
        const domain = await domainService.getDomainById(req);

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

exports.putDomainById = async (req, res,next) => {
    try {
        await domainService.putDomainById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully updated domain with id '${req?.params?.id}'`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update domain using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.deleteDomainById = async (req, res,next) => {
    try {
        await domainService.deleteDomainById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully deleted domain with id '${req?.params?.id}'`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to delete domain using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.getAllDomains = async (req, res,next) => {
    try {
        const domains = await domainService.getAllDomains(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched domains',
            data: {
                domains
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch domains. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.createNewDomain = async (req, res,next) => {
    try {
        const domain = await domainService.createNewDomain(req);

        return res.status(200).json({
            success: true,
            message: `Successfully added domain with id '${domain?.id}'`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to add a new domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
