const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.post('/event/byName', internalController.getEventByName);
router.get('/event/mapping/:domainId', internalController.getEventMapping);

module.exports = router;