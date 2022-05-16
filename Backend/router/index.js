const router = require('../zappucinno').Router;
const users = require('./user.routes');

router.use('/user', users);

module.exports = router;