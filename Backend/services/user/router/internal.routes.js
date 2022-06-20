const router = require('zappucinno').Router();
const { internalController } = require('../controller');

router.post('/find', internalController.findProfileBy);

module.exports = router;