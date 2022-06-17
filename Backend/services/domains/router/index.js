const router = require('zappucinno').Router;
const domain = require('./domain.routes');

router.use('/domain', domain);

module.exports = router;