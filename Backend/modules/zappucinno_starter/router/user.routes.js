const router = require('zappucinno').Router();
const userController = require('../controller').userController;

router.get('/', userController.createUser);
router.post('/:id', userController.getUser);
router.post('/:id/:name', userController.getUser);
router.post('/all/me', userController.getUser);
router.put('/', userController.getUser);
router.patch('/', userController.getUser);
router.delete('/', userController.getUser);

module.exports = router;