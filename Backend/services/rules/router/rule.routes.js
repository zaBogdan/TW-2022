const router = require('zappucinno').Router();
const { rulesController } = require('../controller');

router.get('/:rewardId', rulesController.getRuleById);
router.get('/domain/:domainId', rulesController.getRulesForDomain);
router.post('/domain/:domainId', rulesController.addRuleToDomain);
router.put('/:rewardId', rulesController.updateRuleById);

module.exports = router;