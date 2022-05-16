'use strict'

const http = require('http');
const utils = require('./utils');

const zappucinno = exports = module.exports = {};

zappucinno.init = function () {
    this.settings = {
        env: '',
    };
    this._stack = [];

    this.req = {};
    this.res = {};

    this.defaultConfig();
    return this;
}

zappucinno.defaultConfig = function() {
    this.addHeader('X-Powered-By', 'Zappucinno');
    this.settings.env = process.env.NODE_ENV || 'dev';

    if(this.settings.env === 'dev') {
        process.env.__ZAPPUCINNO_DEBUG__ = true;
    }
    debug("[Zappucinno] Starting on %s mode", this.settings.env);
}

zappucinno.addHeader = (name, value) => {

}

zappucinno.external = function() {
    return this;
}
/**
 * Add a new middleware function to the application
 * @param {string} path - An optional first parameter to specify the paths on which the middleware should be execute
 * @param {Function} fn - The middleware function
 */
zappucinno.use = function() {
    let offset = 0;

    if(typeof(arguments[0]) !== 'function') {
        debug('path conditionated middleware: %s',arguments[0]);
        offset = 1;
    }
    
    if(typeof(arguments[offset]) !== 'function') 
        throw new TypeError('Middleware must be a function!');

    const fn = offset === 0 ? arguments[0] : (req, res, next) => {
        if(req.url.startsWith(arguments[0])) {
            return arguments[offset].bind(this).apply(arguments[1], [req, res, next]);
        } else {
            debug('middleware skipped: %s != %s', arguments[0], req.url);
        }
    };
    this._stack.push(fn);
}

zappucinno._handle = function(req, res, cb) {
    let idx = 0;

    const callback = cb || this.done;

    const next = err => {
        if(this.res.finished) return;

        if(err) {
            if(typeof(err) !== 'object') {
                err = new Error(err)
            }
            return setImmediate(() => callback.bind(this).apply(this, [err]));
        }
        
        if(!this) return;

        if(idx >= this._stack.length) {
            return setImmediate(() => callback.bind(this).apply());
        }
        const layer = this._stack[idx++];
        setImmediate(async () => {
            if(this.res.finished) return;
            try{
                await layer(req, res, next);
                next();
            } catch(err) {
                return next(err);
            }
        });
    }
    next();
}

zappucinno.done = function(err) {
    if(err) {
        debug('Handling error: %s', err);
    } else {
        debug('Finished to handle request');
    }
    if(err) {
        return this.res?.status(err.status || 500)?.json({
            error: err.message,
            stack: this.settings.env === 'dev' ? err.stack : undefined
        })?.end()
    }
}

zappucinno.handler = async function(req, res) {
    this.req = req;
    this.res = res;
    await this.customRequestFunctions();
    this._handle(req,res);
}

zappucinno.listen = function() {
    const server = http.createServer((req, res) => zappucinno.handler(req, res));
    return server.listen.apply(server, arguments);
}

zappucinno.customRequestFunctions = async function() {
    this.res.status = (code) => {
        this.res.statusCode = code;
        return this.res;
    }

    this.res.json = (data) => {
        if(this.res.finished) return;
        this.res.writeHead(this.res.statusCode, {
            'Content-Type': 'application/json'
        });
        // this.res.setEncoding("UTF-8");
        this.res.write(JSON.stringify(data));

        return this.res;
    }

    this.req.body = await new Promise((resolve, reject) => {
        let body = '';
        this.req.on('data', (data) => {
            body += data;
            if(body.length > 1e6) {
                this.req.connection.destroy();
            }
        }).on('end', () => {
            return resolve(body);
        }).on('error', (err) => {
            return reject(err);
        })
    })
}
