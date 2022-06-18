const router = require('zappucinno').Router();
const { domainUsersController } = require('../controller');

router.get('/domain/user/:domainId/:listenerId', domainUsersController.createDomainUser);

module.exports = router;