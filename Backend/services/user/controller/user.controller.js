const { userService } = require('../services');

exports.getProfileById = async (req, res, next) => {
    try {
        const user = await userService.getProfileById(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched user',
            data: {
                user
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch profile using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.getCurrentProfile = async (req, res, next) => {
    try {
        const event = await userService.getCurrentProfile(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched current user',
            data: {
                event
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to fetch current user. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.createNewProfile = async (req, res, next) => {
    try {
        const profile = await userService.createNewProfile(req);

        return res.status(200).json({
            success: true,
            message: `Successfully created user profile for ${profile?.id}`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to create profile for current user. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.updateCurrentProfile = async (req, res, next) => {
    try {
        const profile = await userService.updateCurrentProfile(req);

        return res.status(200).json({
            success: true,
            message: `Successfully updated profile with id ${profile?.id}`,
            data: {
                event
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update current user profile. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
