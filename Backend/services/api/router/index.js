const router = require('zappucinno').Router;
const api = require('./api.routes');

router.use('/api', api);

module.exports = router;