const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.get('/byAPI/:domainId/:apiKey', internalController.getDomainByIdAndApiKey);

module.exports = router;