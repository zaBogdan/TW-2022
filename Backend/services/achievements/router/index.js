const router = require('zappucinno').Router;
const achievements = require('./achievements.routes');

router.use('/achievement', achievements);

module.exports = router;