const app = require('./zappucinno');
const { requestParser } = require('./middlewares');

const _zapp = exports = module.exports = function() {
    if(_zapp.singletonApp === null) {
        _zapp.singletonApp = app.init();
    }
    _zapp.singletonApp.use(requestParser());
    
    return _zapp.singletonApp;
};
_zapp.singletonApp = null;
