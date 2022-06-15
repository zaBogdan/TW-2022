const router = require('zappucinno').Router;
const {
    achievementController,
    authenticationController,
    domainController,
    domainUsersController,
    eventController,
    rankController,
    userController,
} = require('../controller');

router.use('/achievement/*', achievementController.forwardToAchievementService);
router.use('/auth/*', authenticationController.forwardToAuthenticationService);
router.use('/domain/*', domainController.forwardToDomainService);
router.use('/domain/users/*', domainUsersController.forwardToDomainUsersService);
router.use('/event/*', eventController.forwardToEventService);
router.use('/rank/*', rankController.forwardToRankService);
router.use('/user/*', userController.forwardToUserService);

module.exports = router;