const router = require('zappucinno').Router;
const domainUsers = require('./domainUsers.routes');

router.use('/domain/users', domainUsers);

module.exports = router;