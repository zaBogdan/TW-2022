const router = require('zappucinno').Router();
const rankController = require('../controller').rankController;

router.get('/:id', rankController.getRankById);
router.get('/domain/:domainId', rankController.getRanksForDomain);
router.post('/domain/:domainId', rankController.addNewRankToDomain);
router.put('/:id', rankController.updateRankById);
router.delete('/:id', rankController.deleteRankById);

module.exports = router;