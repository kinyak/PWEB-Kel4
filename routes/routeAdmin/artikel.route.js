var express = require('express');

var router = express.Router();

const artikelController = require('../../controller/artikelController/artikel.controller');

const isAuthorized = require('../../middleware/isauthorizedAdmin.middleware');



// Rute untuk operasi CRUD artikel

router.get('/',isAuthorized, artikelController.getAllArtikel);

router.get('/tambah',isAuthorized, artikelController.renderTambahArtikel);

router.post('/tambah',isAuthorized, artikelController.tambahArtikel);

router.get('/ubah/:id',isAuthorized,artikelController.renderUbahArtikel);

router.post('/ubah/:id',isAuthorized, artikelController.ubahArtikel);

router.get('/hapus/:id',isAuthorized, artikelController.hapusArtikel);



module.exports = router;