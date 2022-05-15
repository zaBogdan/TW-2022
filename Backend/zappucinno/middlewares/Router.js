'use strict';

const { debug } = require("console");

const routerModule = module.exports = function(){
    const router = function (req, res, next) {
        return routerModule.handle(req, res, next);  
    };
    router.stack = [];

    router.use = routerModule.use;
    router.get = routerModule.get;


    return router;
} 

routerModule.handle = function(req, res, next) {
    console.log('Router handler');    

}


routerModule.use = function(path, fn) {
    console.log('Router use', path,fn);
    // router.stack.push({
    //     route: path,
    //     handle: fn
    // });
}

routerModule.get = function(path, fn) {

    this.stack.push({ zabogdan: 'true' });
}
