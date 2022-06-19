const router = require('zappucinno').Router();
const achievementsController = require('../controller').achievementsController;

router.get('/:achievementId', achievementsController.getAchievementById);
router.get('/domain/:domainId', achievementsController.getAchievementsForDomain);
router.post('/domain/:domainId', achievementsController.addNewAchievementForDomain);
router.put('/:achievementId', achievementsController.updateAchievementById);
router.delete('/:achievementId', achievementsController.deleteAchievementById);

module.exports = router;