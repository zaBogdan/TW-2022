const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.post('/rank/byName', internalController.getRankByName);

module.exports = router;