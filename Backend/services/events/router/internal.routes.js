const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.post('/event/byName', internalController.getEventByName);

module.exports = router;