const router = require('zappucinno').Router;
const rank = require('./rank.routes');

router.use('/rank', rank);

module.exports = router;