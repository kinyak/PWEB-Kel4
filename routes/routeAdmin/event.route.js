var express = require('express');
var router = express.Router();
const eventController = require('../../controller/crudController/event.controller');
const isAuthorized = require('../../middleware/auth/isauthorizedAdmin.middleware');
const isAlumni = require('../../middleware/auth/isauthorizedAlumni.middleware');
const pengajuanEventValidator = require('../../middleware/validator/pengajuanEventValidator');

// Rute untuk alumni mengajukan event baru
router.post('/alumni/event/upload', isAlumni,pengajuanEventValidator.validateCreateEvent, eventController.createEvent);
router.get('/alumni/event/create', isAlumni, eventController.renderEvent);


router.post('/admin/delete/event',isAuthorized, eventController.hapusEvent);

// Rute untuk alumni melihat event yang diajukan
router.get('/alumni/event/', eventController.getEventsByAlumni);

// Rute untuk mendapatkan semua event (untuk admin)
router.get('/admin/event', isAuthorized, eventController.getAllEvents);
router.get('/generate-pdf/:eventId', isAlumni, eventController.generatepdf);

// Rute untuk memperbarui status event (untuk admin)
router.post('/admin/event/update/:alumniId-:pengajuanEventId', isAuthorized, eventController.updateEventStatus);

module.exports = router;