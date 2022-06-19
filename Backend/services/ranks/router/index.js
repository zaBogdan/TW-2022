const router = require('zappucinno').Router;
const rank = require('./rank.routes');
const internal = require('./internal.routes');

router.use('/internal', internal);
router.use('/rank', rank);

module.exports = router;