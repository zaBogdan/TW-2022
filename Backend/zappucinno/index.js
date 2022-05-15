const { debug } = require('console');
const app = require('./zappucinno');
const { router } = require('./middlewares');

function initApp() {
    app.init();

    return app;
}

exports = module.exports = initApp;
exports.Router = router; 