const http = require('http');

exports.request = async (req, method, url, body) => {
    url  = new URL(url);
    const setup = {
        headers: {
            ...(method !== 'get' ? {
                'Content-Type': 'application/json'
            }: {}),
            ...(req?.headers?.authorization !== undefined ? {
                authorization: req.headers.authorization
            }: {}),
        },
        method: method.toUpperCase(),
        timeout: 1000,
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search
    }
    return await new Promise((resolve, reject) => {
        const __req = http.request(setup, _res => {
            let body = '';

            _res.on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                body = JSON.parse(body)
                if(body.success !== true || body.error || _res.statusCode >= 400) {
                    reject(body);
                } else {
                    resolve(body);
                }
            });
        })
        if(method !== 'get') {
            __req.write(JSON.stringify(body));
        }
        __req.on('error', function(error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error. Contact us at devops@gameify.biz',
            }).end()
        });
        __req.end()
    })
}