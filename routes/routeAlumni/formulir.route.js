const express = require('express');

const router = express.Router();

const controller = require('../../controller/alumniController/formulir-alumni.controller');



// Create a new formulir alumni

router.post('/', controller.createFormulirAlumni);



// Get all formulir alumni

router.get('/', controller.getAllFormulirAlumni);



// Get a single formulir alumni by ID

router.get('/:id', controller.getFormulirAlumniById);



// Update an existing formulir alumni

router.put('/:id', controller.updateFormulirAlumni);



// Delete a formulir alumni

router.delete('/:id', controller.deleteFormulirAlumni);



module.exports = router;