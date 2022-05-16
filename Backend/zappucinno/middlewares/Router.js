'use strict';

const utils = require('../utils');

const routerModule = module.exports = function(){
    const router = function (req, res, next) {
        try {
            return routerModule.handle(req, res, next);  
        } catch(e) {
            next('Failed to find route');
        }
    };

    router.routes = {};

    Object.assign(router, routerModule);

    return router;
} 

routerModule.handle = function(req, res, next) {
    let [path, query] = req.url.split('?');
    if(!path.endsWith('/')) {
        path += '/';
    }

    req.params = {};
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

        func = func[value];
    }

    // add default path for examples like /user or /domain
    if(func['/'] !== undefined)
        func = func['/'];

    const response = func[req.method.toLowerCase()](req, res, next);
    response.end();
    debug('[Zappucinno] Finished request')
    return;
}


routerModule.use = function(path, fn) {
    this.paths = {};
    if(this.paths[path] === undefined) {
        this.paths[path] = {}
    }
    this.paths[path] = fn.routes;
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