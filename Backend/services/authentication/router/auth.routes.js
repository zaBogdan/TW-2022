const router = require('zappucinno').Router();
const userController = require('../controller').userController;

router.post('/login', () => {});
router.post('/register', userController.getUser);
router.get('/refresh', userController.getUser);
router.post('/change_password', userController.getUser);

module.exports = router;