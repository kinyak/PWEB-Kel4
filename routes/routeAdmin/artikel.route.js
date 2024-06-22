var express = require('express');
var router = express.Router();
const artikelController = require('../../controller/crudController/artikel.controller');
const isAuthorized = require('../../middleware/auth/isauthorizedAdmin.middleware');
const createArtikelValidator = require('../../middleware/validator/createArtikelValidator');

// Rute untuk operasi CRUD artikel
router.get('/',isAuthorized, artikelController.getAllArtikel);
router.get('/tambah',isAuthorized, artikelController.renderTambahArtikel);
router.get('/edit/:id',isAuthorized, artikelController.editArtikel);
router.post('/update/:id',isAuthorized,artikelController.updateArtikel);
router.post('/tambah',isAuthorized,artikelController.uploadPhoto, createArtikelValidator.validateTambahArtikel,artikelController.tambahArtikel);
router.post('/hapus',isAuthorized, artikelController.hapusArtikel);

module.exports = router;