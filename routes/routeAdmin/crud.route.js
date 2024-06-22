var express = require('express');
var router = express.Router();
const controller = require('../../controller/adminController/adminCRUD.controller');
const isAuthorized = require('../../middleware/auth/isauthorizedAdmin.middleware');
const createAlumniValidator = require('../../middleware/validator/createAlumniValidator');







router.get('/lihat/alumni', isAuthorized, controller.getAllAlumni)
router.post('/update/alumni', isAuthorized,controller.updateAlumni)

router.post('/create/alumni',isAuthorized, controller.uploadPhoto,createAlumniValidator.validateCreateAlumni, controller.createAlumni)

router.post('/delete/alumni', isAuthorized, controller.deleteAlumni)

router.post('/updatephoto:id',isAuthorized, controller.uploadPhoto, controller.updatephotoProfile);

module.exports = router;