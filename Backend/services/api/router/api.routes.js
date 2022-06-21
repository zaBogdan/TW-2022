const router = require('zappucinno').Router();
const { apiController } = require('../controller');

router.post('/domain/:domainId/listen', apiController.getProfileById);

module.exports = router;