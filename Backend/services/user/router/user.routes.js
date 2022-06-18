const router = require('zappucinno').Router();
const { userController } = require('../controller');

router.get('/profile/:id', userController.getProfileById);
router.get('/self', userController.getCurrentProfile);
router.post('/profile', userController.createNewProfile);
router.put('/self', userController.updateCurrentProfile);

module.exports = router;