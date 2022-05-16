'use strict';

const { router } = require('./middlewares');
const app = require('./initialize');

exports = module.exports = app;
exports.Router = router; 
