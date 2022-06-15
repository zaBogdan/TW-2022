'use strict';

const utils = require('../utils');

const routerModule = module.exports = function(){
    const router = async function (req, res, next) {
        return routerModule.handle(req, res, next);  
    };

    router.routes = {};

    Object.assign(router, routerModule);

    return router;
} 
routerModule.paths = {}

routerModule.handle = async function(req, res, next) {
    debug('[ Zappucinno ][ Router ] Started handling request')
    let [path, query] = req.url.split('?');

    if(!path.endsWith('/')) {
        path += '/';
    }

    req.params = {}; // add query params to req.params
    let start = 1, func = this.paths;
    while(start < path.length) {
        const firstSlash = path.indexOf('/', start);
        let value = path.substring(start - 1, firstSlash);
        start = firstSlash + 1;

        // match functions like /user/:id/:name
        if(func[value] === undefined) {
            for(const key of Object.keys(func)) {
                if(key.startsWith('/:')) {
                    req.params[key.substring(2)] = value.substring(1);
                    value = key;
                    break;
                }
            }
        }
        // always use the /* case for a match
        if(func['/*'] !== undefined) break;
        func = func[value];
        
        if(func === null || func === undefined) break;
    }
    if(func === undefined) {
        throw new Error('Failed to find specified path');
    }

    let response = undefined;

    // add default path for examples like /user or /domain
    if(func['/'] !== undefined)
        func = func['/'];
    else if(func['/*'] !== undefined) {
        func = func['/*'];
        response = await func(req,res, next) || null;
    }

    if(response === undefined) {
        const method = req.method.toLowerCase();
        if(func[method] === undefined) {
            throw new Error(`Method ${req.method} is not supported for this route!`);
        }
        response = await func[req.method.toLowerCase()](req, res, next);
    }

    if(response !== undefined) {
        res?.end();
        res.finished = true;
    }
    debug('[ Zappucinno ][ Router ] Finished request')
    return;
}

routerModule.use = function(path, fn) {
    const pathSplit = path.slice(1).split('/');
    if(pathSplit.length === 1) {
        pathSplit.push('')
    }

    let entryPoint = null;
    const nestedPath = {};
    let reference = nestedPath;
    let data = {}

    pathSplit.forEach((el, index) => {
        if(index === 0) {
            entryPoint = `/${el}`;
            return;
        }
        if(pathSplit.length === index + 1) {
            if(el === '*') {
                data = fn
            } else {
                data = fn.routes;
            }
        }
        if(el !== '') {
            el = `/${el}`;
            reference[el] = data;
            reference = reference[el]
        }
    })
    if(this.paths[entryPoint] === undefined) {
        this.paths[entryPoint] = nestedPath
    } else {
        this.paths[entryPoint] = {
            ...this.paths[entryPoint],
            ...data
        }
    }
}

routerModule.buildPathObject = function(path) {
    let route = this.routes 
    const pathArray = path.split('/');
    let consecutiveSlashes = false;

    // we want to avoid situations like: ['',''] or ['', '/:id']
    pathArray.slice(1).every(el => {
        // we want to avoid things like /user/id//
        if(el === '' && consecutiveSlashes === true)
            return false;
        consecutiveSlashes = (el === ''); 
        const formatedEl = `/${el}`;
        if(route[formatedEl] === undefined) {
            route[formatedEl] = {};
        }
        route = route[formatedEl];
        return true;
    });

    return route;

    // return
}

routerModule.get = function(path, fn) {
    this.buildPathObject(path).get = fn;
}

routerModule.post = function(path, fn) {
    this.buildPathObject(path).post = fn;
}

routerModule.put = function(path, fn) {
    this.buildPathObject(path).put = fn;
}

routerModule.patch = function(path, fn) {
    this.buildPathObject(path).patch = fn;
}

routerModule.delete = function(path, fn) {
    this.buildPathObject(path).delete = fn;
}