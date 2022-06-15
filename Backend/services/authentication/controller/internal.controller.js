const { validateToken } = require('../modules');

exports.validate = async (req, res,next) => {
    try {
        await validateToken(req);
        console.log('validateToken');
        return res.status(200).json({
            success: true,
            message: 'Token is valid'
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Token is invalid', 
        });
    }
}