const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.get('/domain/user/:domainId/:listenerId', internalController.createDomainUser);
router.put('/domain/user/:domainId/:listenerId', internalController.updateDomainUser);
router.get('/domain/user/leaderboard/:domainId', internalController.getLeaderboardForDomain);

module.exports = router;