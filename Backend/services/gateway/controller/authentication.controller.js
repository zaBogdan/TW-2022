const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer({
 changeOrigin: true,
 target: {
    https: false
 }
});
const servicesURL = require('shared').config.services;

exports.forwardToAuthenticationService = async (req, res,next) => {
    try {
        return await new Promise((resolve, reject) => {
            apiProxy.web(req, res, {
                target: servicesURL.AUTHENTICATION,
            }, err => {
                throw new Error(err)
            });
            apiProxy.on('proxyRes', function (proxyRes, req, res) {
                resolve(proxyRes)
            });
        })
    }catch(e) {
        return res.status(500).json({
            success: false,
            message: '',
        });
    }

}
