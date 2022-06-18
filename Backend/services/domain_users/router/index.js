const router = require('zappucinno').Router;
const domainUsers = require('./domainUsers.routes');
const internal = require('./internal.routes');

router.use('/domain/users', domainUsers);
router.use('/internal', internal);

module.exports = router;