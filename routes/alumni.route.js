var express = require('express');
var router = express.Router();
const verifyToken= require ('../middleware/verifytoken.middleware');


// router.use(role('mahasiswa'));


router.get('/notfound', verifyToken, function(req, res, next) {
  res.render('notfound',{title: 'notfound'});
});

router.get('/alumni/home', verifyToken, function(req, res, next) {
  res.render('/alumni/home');
});

router.get('/', verifyToken, function(req, res, next) {
  res.render('login',{title: 'Login'});
});

//
module.exports = router;
