var express = require('express');
var router = express.Router();
const verifyToken = require ('../middleware/verifytoken.middleware');
const controller = require('../controller/auth.controller');


router.use(verifyToken);

router.get('/dashboard',verifyToken,function(req, res, next) {
  res.render('admin/dashboard', {title: 'home'});
});

router.get('/profile',verifyToken,controller.getProfile, function(req, res, next) {
  
});

router.post('/ubahpassword',verifyToken,controller.changePassword, function(req, res) {
  res.status(200).send("Password berhasil diubah");
});

router.get('/home',verifyToken,function(req, res, next) {
  res.render('admin/dashboard', {title: 'home'});
});



module.exports = router;
