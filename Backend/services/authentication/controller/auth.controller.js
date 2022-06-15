const { authService } = require('../services');

exports.login = async (req, res,next) => {
    return res.status(200).json({
        success: true,
        message: 'Hello World',
    });
}

exports.register = async (req, res,next) => {
    try {
        const email = await authService.handleEmailRegister(req);

        return res.status(200).json({
            success: true,
            message: `Successfully registered user with email '${email}'`,
            data: {
                user: {
                    email,
                    active: true
                }
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to register user. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.refresh = async (req, res,next) => {
    return res.status(200).json({
        success: true,
        message: 'Hello World',
    });
}

exports.changePassword = async (req, res,next) => {
    return res.status(200).json({
        success: true,
        message: 'Hello World',
    });
}


