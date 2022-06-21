const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.post('/achievement/byName', internalController.getAchievementByName);
router.get('/achievement/:domainId/:achievementId', internalController.getAchievementById);
module.exports = router;