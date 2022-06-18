const router = require('zappucinno').Router();
const { domainUsersController } = require('../controller');

router.get('/:listenerId', domainUsersController.getUserByListenerId);
router.get('/leaderboard', domainUsersController.getDomainUserLeaderboard);
router.get('/history/:listenerId', domainUsersController.getDomainUserHistory);
router.put('/:listenerId', domainUsersController.updateUserByListenerId);

module.exports = router;