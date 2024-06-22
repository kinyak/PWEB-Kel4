var express = require('express');
var router = express.Router();
const lowonganController = require('../../controller/crudController/lowongan.controller');
const isAuthorizedAdmin = require('../../middleware/auth/isauthorizedAdmin.middleware');
const isAuthorizedAlumni = require('../../middleware/auth/isauthorizedAlumni.middleware');
const createLowonganValidator = require('../../middleware/validator/createLowonganValidator');


router.get('/alumni/lowongan/lihat', isAuthorizedAlumni, lowonganController.getAllLowonganAlumni);
router.get('/admin/lowongan', isAuthorizedAdmin, lowonganController.getAllLowongan);
router.get('/admin/lowongan/tambah', isAuthorizedAdmin, lowonganController.renderTambahLowongan);
router.post('/admin/lowongan/tambah', isAuthorizedAdmin, lowonganController.uploadPhoto, createLowonganValidator.validateTambahLowongan, lowonganController.tambahLowongan);
router.delete('/admin/lowongan/:id', isAuthorizedAdmin, lowonganController.hapusLowongan);
module.exports = router;