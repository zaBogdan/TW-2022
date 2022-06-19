const router = require('zappucinno').Router;
const rule = require('./rule.routes');
const internal = require('./internal.routes');

router.use('/rule', rule);
router.use('/internal', internal);

module.exports = router;