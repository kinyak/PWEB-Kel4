const express = require('express');
const router = express.Router();
const controller = require('../../controller/alumniController/formulir-alumni.controller');
const isauthorizedAdmin = require('../../middleware/auth/isauthorizedAdmin.middleware');
const isauthorizedAlumni = require('../../middleware/auth/isauthorizedAlumni.middleware');
const formulirValidator = require('../../middleware/validator/formulirAlumniValidator')

// Create a new formulir alumni
router.post('/alumni/form/upload',formulirValidator.validateFormulirAlumni,isauthorizedAlumni, controller.createFormulirAlumni);
router.get('/alumni/form/upload',isauthorizedAlumni,controller.canUploadFormulir, controller.renderFormulirAlumni)
// Get all formulir alumni
router.get('/admin/form/:id',controller.getFormulirAlumniById);
router.post('/admin/form/generateexcel',controller.generate_excel);

router.get('/admin/form',isauthorizedAdmin, controller.getAllFormulirAlumni);

router.post('/admin/form/delete',isauthorizedAdmin, controller.deleteFormulirAlumni);

router.get('/alumni/form/lihat',isauthorizedAlumni, controller.getFormulirForCurrentUser)
// Get a single formulir alumni by ID
router.get('alumni/form/:id',controller.createFormulirAlumniById, function(req, res) {
    });

    

module.exports = router;