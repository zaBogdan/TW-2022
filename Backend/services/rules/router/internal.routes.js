const router = require('zappucinno').Router();
const {internalController} = require('../controller');

router.get('/rule/related/:eventId', internalController.getRulesByContainingEvent);

module.exports = router;