var express = require('express');
var router = express.Router();
const controllerAdmin = require('../controller/autentikasi.controller/authAdmin.controller');
const controllerAlumni = require('../controller/autentikasi.controller/authAlumni.controller');
const isLogin = require('../middleware/islogin.middleware');




router.get('/login/admin',isLogin,controllerAdmin.form);
router.post('/checklogin/admin',controllerAdmin.checklogin)


router.get('/login/alumni',isLogin,controllerAlumni.form);
router.post('/checklogin/alumni',controllerAlumni.checklogin)





module.exports = router;
