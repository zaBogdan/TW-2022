const url = require('url')

/**
 * A middleware that enables CORS
 * @param {*} options 
 * @property {string} options.origin - The origin to allow (without http(s)://)
 * @property {array} options.origin - An array of allowed origins (without http(s)://)
 * @property {function} option.origin(hostname) - A function that returns true if the hostname is allowed
 * @property {boolean} options.credentials - Whether to allow credentials
 * @property {array|string} options.methods - The methods to allow
 * @returns {Function} representing the middleware function for Zappucinno 
 */
module.exports = function(options) {
    const defaultOptions = {
        origin: '*',
        methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
        headers: 'Vary',
        credentials: false,
    }
    
    const configureOrigin = async req => {
        if(!options.origin || options.origin === '*' || options.origin.includes('*')) {
            console.log('Everything allowed here')
            return true;
        }

        if(Array.isArray(options.origin)) {
            return options.origin.includes(req.headers.host);
        } 

        if(typeof(options.origin) === 'string') {
            return options.origin === req.headers.host;
        }

        if(typeof(options.origin) === 'function') {
            return await options.origin(req.headers.host);
        }

        return false;
    }

    const configureCredentials = () => {
        if(options.credentials === true) {
            return true;
        }
        return null;
    }

    const configureMethod = (req) => {
        if(!options.method) {
            options.method = defaultOptions.methods
        }

        if(typeof(options.methods) === 'string' && options.methods === req.method) {
            return options.methods;
        }

        if(Array.isArray(options.method) && options.method.includes(req.method)) {
            return req.method;
        }

        return null;
    }

    const cors = async function(req, res, next) {
        const origin = await configureOrigin(req);
        if(origin === false) 
            return;

        res.setHeader('Access-Control-Allow-Origin', '*');

        const method = configureMethod(req);
        if(method !== null) {
            res.setHeader('Access-Control-Allow-Methods',  method);
        }
        res.setHeader('Access-Control-Allow-Headers', defaultOptions.headers);
        
        if(configureCredentials()) {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
    };

    return cors;
}