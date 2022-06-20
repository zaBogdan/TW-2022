const router = require('zappucinno').Router;
const event = require('./event.routes');
const internal = require('./internal.routes');

router.use('/internal', internal);
router.use('/event', event);

module.exports = router;