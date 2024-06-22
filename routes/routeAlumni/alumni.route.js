var express = require('express');
var router = express.Router();
const controllerAlumni = require('../../controller/autentikasiController/authAlumni.controller');
const isAuthorized = require('../../middleware/auth/isauthorizedAlumni.middleware');
const db = require('../../models');
const Artikel = db.artikel;
// router.use(role('mahasiswa'));




router.get('/alumni/home',isAuthorized, controllerAlumni.renderHome);

router.get('/', function(req, res, next) {
  res.render('home', {title: 'Homepage'});
});

router.get('/sebaran-alumni', function(req, res, next) {
  res.render('sebaran',);
});

router.get('/blog', async (req, res) => {
  try {
    const articles = await Artikel.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Sanitize the articles data
    const sanitizedArticles = articles.map(article => ({
      id: article.id,
      judul: article.judul || 'Untitled',
      konten: article.konten || null,
      gambar: article.gambar || null,
      // Add any other fields you're using
    }));

    res.render('artikel', { articles: sanitizedArticles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).send('Error fetching articles');
  }
});

router.get('/home', function(req, res, next) {
  res.render('home');
});


router.get('/alumni/signup', function(req, res, next) {
  res.render('alumni/signup-preline', {title: 'Sign Up'});
});

router.get('/alumni/profile', isAuthorized, controllerAlumni.getProfile);

router.post('/alumni/checksignup',controllerAlumni.signUp)
router.post('/alumni/ubahpassword',controllerAlumni.changePassword)

router.post('/alumni/updatephoto',isAuthorized, controllerAlumni.uploadPhoto, controllerAlumni.updatephotoProfile);

router.get('/alumni/logout',isAuthorized,controllerAlumni.logout);
//
router.get('/notfound',function(req, res, next) {
  res.render('notfound',{title: 'notfound'});
});


module.exports = router;
