const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.get('/byAPI/:domainId/:apiKey', internalController.getDomainByIdAndApiKey);
router.get('/byAPIKey/:apiKey', internalController.getDomainByApiKey);

module.exports = router;