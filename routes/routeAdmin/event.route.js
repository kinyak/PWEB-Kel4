var express = require('express');
var router = express.Router();
const eventController = require('../../controller/crudController/event.controller');
const isAuthorized = require('../../middleware/auth/isauthorizedAdmin.middleware');
const isAlumni = require('../../middleware/auth/isauthorizedAlumni.middleware');
const pengajuanEventValidator = require('../../middleware/validator/pengajuanEventValidator');

router.post('/alumni/event/upload', isAlumni,pengajuanEventValidator.validateCreateEvent, eventController.createEvent);
router.get('/alumni/event/create', isAlumni, eventController.renderEvent);


router.post('/admin/delete/event',isAuthorized, eventController.hapusEvent);

router.get('/alumni/event/', eventController.getEventsByAlumni);

router.get('/admin/event', isAuthorized, eventController.getAllEvents);
router.get('/generate-pdf/:eventId', isAlumni, eventController.generatepdf);

router.post('/admin/event/update/:alumniId-:pengajuanEventId', isAuthorized, eventController.updateEventStatus);

module.exports = router;