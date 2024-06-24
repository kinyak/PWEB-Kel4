var express = require('express');
var router = express.Router();
const controller = require('../../controller/autentikasiController/authAdmin.controller');
const isAuthorized = require('../../middleware/auth/isauthorizedAdmin.middleware');


router.get('/dashboard',isAuthorized,controller.renderDashboard);

router.get('/profile', isAuthorized, (req, res, next) => {
  controller.getProfile(req, res, next, req.session.user);
});

router.post('/ubahpassword',isAuthorized,controller.changePassword, function(req, res) {
  res.status(200).send("Password berhasil diubah");
});

router.get('/home',isAuthorized,function(req, res, next) {
  res.render('admin/dashboard', {title: 'home'});
});



router.get('/logout',isAuthorized,controller.logout);



module.exports = router;
