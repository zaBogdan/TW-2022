const router = require('zappucinno').Router;
const achievements = require('./achievements.routes');
const internal = require('./internal.routes');

router.use('/achievement', achievements);
router.use('/internal', internal);

module.exports = router;