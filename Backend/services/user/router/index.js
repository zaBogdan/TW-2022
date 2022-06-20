const router = require('zappucinno').Router;
const user = require('./user.routes');
const internal = require('./internal.routes');

router.use('/user', user);
router.use('/internal/user', internal);

module.exports = router;