const router = require('zappucinno').Router;
const event = require('./event.routes');

router.use('/event', event);

module.exports = router;