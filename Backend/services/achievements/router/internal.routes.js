const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.post('/achievement/byName', internalController.getAchievementByName);

module.exports = router;