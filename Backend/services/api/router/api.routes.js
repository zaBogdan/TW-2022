const router = require('zappucinno').Router();
const { apiController } = require('../controller');

router.post('/domain/listen/:domainId', apiController.listenForDomainEvents);
router.get('/domain/user/info/:listenerId', apiController.getDomainUserByListenerId);
router.get('/domain/user/leaderboard', apiController.getLeaderboardForDomain);
router.put('/domain/user/info/:listenerId', apiController.updateDomainUserByListenerId);
router.get('/domain/event/:domainId', apiController.getEventsForDomain);

module.exports = router;