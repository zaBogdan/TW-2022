const router = require('zappucinno').Router();
const domainController = require('../controller').domainController;

router.get('/:id', domainController.getDomainById);
router.put('/:id', domainController.putDomainById);
router.delete('/:id', domainController.deleteDomainById);
router.get('/self', domainController.getAllDomains);
router.post('/self', domainController.createNewDomain);
router.get('/statistics/:id', domainController.getStatsForDomain);

module.exports = router;