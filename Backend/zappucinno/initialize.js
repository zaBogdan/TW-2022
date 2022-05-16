const app = require('./zappucinno');

const _zapp = exports = module.exports = function() {
    if(_zapp.singletonApp === null) {
        _zapp.singletonApp = app.init();
    }
    
    return _zapp.singletonApp;
};
_zapp.singletonApp = null;
