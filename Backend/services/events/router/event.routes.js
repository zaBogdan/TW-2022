const router = require('zappucinno').Router();
const eventController = require('../controller').eventController;

router.get('/:id', eventController.getEventById);
router.get('/domain/:domainId', eventController.getEventsForDomain);
router.post('/domain/:domainId', eventController.addNewEventToDomain);
router.put('/:id', eventController.updateEventById);
router.delete('/:id', eventController.deleteEventById);

module.exports = router;