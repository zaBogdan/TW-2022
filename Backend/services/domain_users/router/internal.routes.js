const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.get('/domain/user/:domainId/:listenerId', internalController.createDomainUser);

module.exports = router;