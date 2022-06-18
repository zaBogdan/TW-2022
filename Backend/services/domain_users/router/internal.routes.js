const router = require('zappucinno').Router();
const { domainUsersController } = require('../controller');

router.post('/domain/user/:domainId', domainUsersController.createDomainUser);

module.exports = router;