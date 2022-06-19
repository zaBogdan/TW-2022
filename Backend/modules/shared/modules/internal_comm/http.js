const http = require('http');

exports.request = async (req, method, URL) => {
    const setup = {
        headers: {
            ...(method !== 'get' ? {
                'Content-Type': 'application/json'
            }: {}),
            ...(req?.headers?.authorization !== undefined ? {
                authorization: req.headers.authorization
            }: {}),
        }
    }

    return await new Promise((resolve, reject) => {
        const __req = http[method](URL, setup, _res => {
            let body = '';
            _res.on('data', (chunk) => {
                body += chunk;
            }).on('end', () => {
                body = JSON.parse(body)
                if(_res.statusCode < 400) {
                    resolve(body);
                } else {
                    reject(body);
                }
            });
        })
        __req.on('error', function(error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error. Contact us at devops@gameify.biz',
            }).end()
        });
    })
}