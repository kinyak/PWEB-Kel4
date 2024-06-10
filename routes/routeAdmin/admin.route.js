var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../../controller/autentikasiController/authAdmin.controller');
const isAuthorized = require('../../middleware/isauthorizedAdmin.middleware');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  }
});
const upload = multer({ storage: storage });

// router.use(verifyToken);


router.get('/dashboard',isAuthorized,function(req, res, next) {
  res.render('admin/dashboard', {title: 'home'});
});

router.get('/profile',isAuthorized,controller.getProfile, function(req, res, next) {
  
});

router.post('/ubahpassword',isAuthorized,controller.changePassword, function(req, res) {
  res.status(200).send("Password berhasil diubah");
});

router.get('/home',isAuthorized,function(req, res, next) {
  res.render('admin/dashboard', {title: 'home'});
});

router.post('/updatephoto:id',isAuthorized, upload.single('profilePicture'), controller.updatephotoProfile);

router.post('/logout',isAuthorized,controller.logout);


module.exports = router;
