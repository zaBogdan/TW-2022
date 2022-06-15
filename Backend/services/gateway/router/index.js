const router = require('zappucinno').Router;
const users = require('./user.routes');

router.use('/user/*', (req, res, next) => {
    console.log('Router testing')
});
router.use('/domain/user/*', (req, res, next) => {
    console.log('Router testing')
});

router.use('/domain', users)

module.exports = router;