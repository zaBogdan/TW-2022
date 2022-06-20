const httpProxy = require('http-proxy');

exports.proxyRequest = async(req, res, URL) => {
    const apiProxy = httpProxy.createProxyServer({
        changeOrigin: true,
        target: {
           https: false
        }
    });
    return await new Promise((resolve, reject) => {
        apiProxy.web(req, res, {
            target: URL,
        }, err => {
            reject(err)
        });
        apiProxy.on('error', function(err, req, res) {
            console.log(err)
        })
        apiProxy.on('proxyRes', function (proxyRes, req, res) {
            resolve(proxyRes)
        });
    })
}