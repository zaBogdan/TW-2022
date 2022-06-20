const router = require('zappucinno').Router();
const internalController = require('../controller').internalController;

router.get('/validate', internalController.validate);

module.exports = router;