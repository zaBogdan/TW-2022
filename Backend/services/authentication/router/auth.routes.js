const router = require('zappucinno').Router();
const authController = require('../controller').authController;

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/refresh', authController.refresh);
router.post('/change_password', authController.changePassword);

module.exports = router;