const { validateToken } = require('../modules');

exports.validate = async (req, res,next) => {
    try {
        const data = await validateToken(req);
        return res.status(200).json({
            success: true,
            message: 'Token is valid',
            data
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Token is invalid', 
        });
    }
}