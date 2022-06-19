const { rankService } = require('../services');

exports.getRankById = async (req, res, next) => {
    try {
        const rank = await rankService.getRankById(req);

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
exports.getRanksForDomain = async (req, res, next) => {
    try {
        const ranks = await rankService.getRanksForDomain(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched ranks for domain',
            data: {
                ranks
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get ranks for specified domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.addNewRankToDomain = async (req, res, next) => {
    try {
        const rank = await rankService.addNewRankToDomain(req);

        return res.status(200).json({
            success: true,
            message: `Successfully added rank with id ${rank?._id} to domain`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to create rank for specified domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.updateRankById = async (req, res, next) => {
    try {
        const rank = await rankService.updateRankById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully updated rank with id ${rank?._id}`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update rank for specified domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.deleteRankById = async (req, res, next) => {
    try {
        const rank = await rankService.deleteRankById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully deleted rank with id ${rank?._id}`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to delete rank using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}