const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const servicesURL = require('shared').config.services;

exports.forwardToAuthenticationService = async (req, res,next) => {
    console.log('Started')
    const proxy = await apiProxy.web(req, res, {
        target: servicesURL.AUTHENTICATION
    }, err => {
        console.log(err)
    });
    return res.status(200).json({
        success: true,
        message: 'forwardToAuthenticationService',
    });
}
