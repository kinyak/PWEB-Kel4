var express = require('express');
var router = express.Router();
const controllerAdmin = require('../controller/autentikasiController/authAdmin.controller');
const controllerAlumni = require('../controller/autentikasiController/authAlumni.controller');
const isLogin = require('../middleware/auth/islogin.middleware');




router.get('/login/admin',isLogin,controllerAdmin.form);
router.post('/checklogin/admin',controllerAdmin.checklogin)


router.get('/login/alumni',isLogin,controllerAlumni.form);
router.post('/checklogin/alumni',controllerAlumni.checklogin)




module.exports = router;
