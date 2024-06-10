var express = require('express');
var router = express.Router();
const controllerAlumni = require('../../controller/autentikasiController/authAlumni.controller');


// router.use(role('mahasiswa'));


router.get('/notfound',function(req, res, next) {
  res.render('notfound',{title: 'notfound'});
});

router.get('/alumni/home', function(req, res, next) {
  res.render('alumni/home');
});

router.get('/', function(req, res, next) {
  res.render('home');
});


router.get('/alumni/signup', function(req, res, next) {
  res.render('alumni/signup', {title: 'Sign Up'});
});

router.post('/alumni/checksignup',controllerAlumni.signUp)

router.post('/alumni/logout',controllerAlumni.logout);
//
module.exports = router;
