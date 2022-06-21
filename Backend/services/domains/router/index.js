const router = require('zappucinno').Router;
const domain = require('./domain.routes');
const internal = require('./internal.routes');

router.use('/internal/domain', internal);
router.use('/domain', domain);

module.exports = router;