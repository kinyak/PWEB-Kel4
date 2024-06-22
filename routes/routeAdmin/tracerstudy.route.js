var express = require('express');
var router = express.Router();
const tracerstudyController = require('../../controller/crudController/periodetracerstudy.controller');
const isAuthorized = require('../../middleware/auth/isauthorizedAdmin.middleware');
const tracerstudyValidator = require('../../middleware/validator/tracerstudyValidator');


router.get('/',isAuthorized, tracerstudyController.getAllPeriodeTracerStudy);
router.post('/tambah',isAuthorized,tracerstudyValidator.validateTambahPeriodeTracerStudy ,tracerstudyController.tambahPeriodeTracerStudy);
router.post('/ubah/:id',isAuthorized, tracerstudyController.ubahPeriodeTracerStudy);
router.post('/hapus',isAuthorized, tracerstudyController.hapusPeriodeTracerStudy);

module.exports = router;