var express = require('express');
var router = express.Router();
const controller = require('../controller/autentikasi.controller/authAdmin.controller');


// router.use(verifyToken);

router.get('/dashboard',function(req, res, next) {
  res.render('admin/dashboard', {title: 'home'});
});

router.get('/profile',controller.getProfile, function(req, res, next) {
  
});

router.post('/ubahpassword',controller.changePassword, function(req, res) {
  res.status(200).send("Password berhasil diubah");
});

router.get('/home',function(req, res, next) {
  res.render('admin/dashboard', {title: 'home'});
});


router.post('/logout',controller.logout);


module.exports = router;
