const router = require('zappucinno').Router();
const { rulesController } = require('../controller');

router.get('/:ruleId', rulesController.getRuleById);
router.get('/domain/:domainId', rulesController.getRulesForDomain);
router.post('/domain/:domainId', rulesController.addRuleToDomain);
router.put('/:ruleId', rulesController.updateRuleById);

module.exports = router;