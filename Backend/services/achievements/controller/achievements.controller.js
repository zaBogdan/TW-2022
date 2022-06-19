const { achievementsService } = require('../services');

exports.getAchievementById = async (req, res, next) =>  {
    try {
        const achievement = await achievementsService.getAchievementById(req);

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
            message: 'Failed to get achievement using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.getAchievementsForDomain = async (req, res, next) =>  {
    try {
        const achievements = await achievementsService.getAchievementsForDomain(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched achievements for specified domain',
            data: {
                achievements
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get achievements for domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.addNewAchievementForDomain = async (req, res, next) =>  {
    try {
        const achievement = await achievementsService.addNewAchievementForDomain(req);

        return res.status(200).json({
            success: true,
            message: `Successfully added achievement with id '${achievement?._id}'`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to create achievement for specified domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.updateAchievementById = async (req, res, next) =>  {
    try {
        const achievement = await achievementsService.updateAchievementById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully updated achievement with id '${achievement?._id}'`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update achievement using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.deleteAchievementById = async (req, res, next) =>  {
    try {
        const achievement = await achievementsService.deleteAchievementById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully deleted achievement with id '${achievement?._id}'`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to delete achievement using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}