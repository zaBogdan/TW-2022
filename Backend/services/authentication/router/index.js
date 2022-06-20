const router = require('zappucinno').Router;
const auth = require('./auth.routes');
const internal = require('./internal.routes');

router.use('/auth', auth);
router.use('/internal', internal);

module.exports = router;