// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require('../../models');
const Alumni = db.alumni;
const Admin = db.admin;
require('dotenv').config();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/alumni/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
        }
    });
    
    const upload = multer({ storage: storage,  limits: { fileSize: 1024 * 1024 * 5 }  });

const form = (req, res) => {
  if (req.session.user) {
    if (req.session.user.roleId === 1) {
      return res.redirect("/admin/home");
    } else if (req.session.user.roleId === 2) {
      return res.redirect("/alumni/home");
    }
  }
  const oldData = req.flash('oldData')[0] || {};
  res.render("alumni/login", {oldData, title: "Login Alumni" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const foundUser = await Alumni.findOne({ where: { email } });

    if (!foundUser) {
      req.flash('error', 'Username or Password Invalid');
      res.render('alumni/login', {  title: 'Login Error', messages: req.flash() });
    }
    else {
      const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (isValidPassword == true) {

    req.session.user = {
      id: foundUser.id,
      email: foundUser.email,
      roleId: foundUser.roleId,
    };

    if (foundUser.roleId === 1) {
      return res.redirect("/admin/dashboard");
    } else if (foundUser.roleId === 2) {
      return res.redirect("/alumni/home");
    }
  
    }

    else {
      req.flash('error', 'Username or Password Invalid');
      res.render('alumni/login', { title: 'Login Error', messages: req.flash() });
    }

    
    }
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {

  req.session.destroy((err) => {
    if (err) {
      console.error('Error ketika logout:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.redirect('/auth/login/alumni');
  });
}

const getProfile = async (req, res, next) => {
  try {
    const roleId = req.session.user.roleId;
    if (roleId !== 2) {
      req.flash('error', 'Unauthorized: User not allowed');
      return res.render('alumni/profile', { title: 'Unauthorized', messages: req.flash() });
    }

    const emailAlumni = req.session.user.email;
    const foundUser = await Alumni.findOne({ where: { email: emailAlumni } });
    console.log(foundUser);

    if (!foundUser) {
      req.flash('error', 'Username or Password Invalid');
      return res.render('alumni/profile', { title: 'Unauthorized', messages: req.flash() });
    }

    const filepath = foundUser.gambar;
    alumniEmail = req.session.user.email;
    const alumniInstance = await Alumni.findOne({ where: { email: alumniEmail } });
    res.render('alumni/profile', { user: foundUser, title: "Profile", path: filepath, messages: req.flash(),alumni: alumniInstance  });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


  const changePassword = async (req, res, next) => {
    email = req.session.user.email
    const {oldpassword, newpassword } = req.body;
    
    try {
      const user = await Alumni.findOne({ where: { email } });
  
      if (!user) {
      req.flash('notfound', 'Username tidak ditemukan');
      return res.render('admin/profile', {  title: 'Unauthorized', messages: req.flash() });
      }
  
      
      const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
          req.flash('error', 'Username atau Password Invalid');
          return res.render('admin/profile', {  title: 'Unauthorized', messages: req.flash() });
        }
    
    
        await user.update({ password: await bcrypt.hash(newpassword, 10), });
      next();
      
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).send("Internal server error");
    }
  };


  const signUp = async (req, res, next) => {
    const { nim, nama, email, password,  confirmedPassword} = req.body;
  
    try {
      const existingUser = await Alumni.findOne({ where: { email } });
      if (existingUser) {
        req.flash('error', 'Email atau NIM Invalid');
        return res.render('alumni/profile', {  title: 'Error', messages: req.flash() });
      }
      
      else {
      if (password !== confirmedPassword) {
        req.flash('error', 'Password tidak sesuai');
        return res.render('alumni/profile', {  title: 'Error', messages: req.flash() });
      }

      else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Alumni.create({
        email: email,
        password: hashedPassword,
        nim: nim,
        name: nama,
        roleId: 2,
      });
  
      return res.status(201).json(newUser);
        }
      }
      
        } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).send("Internal server error");
    }
  };


  const renderHome = async (req, res) => {
    try {
      alumniEmail = req.session.user.email;
      const alumniInstance = await Alumni.findOne({ where: { email: alumniEmail } });
      res.render('alumni/home', { title: 'Alumni Home', alumni: alumniInstance }); 
  } catch (err) {
      console.log(err)
  }
  }


  const uploadPhoto = (req, res, next) => {
    upload.single('profilePicture')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size is too large. Max limit is 5MB' });
        }
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(500).json({ error: 'File upload failed' });
    }

    next()
    });
};

const updatephotoProfile = async (req, res) => {
  try {
    const { email } = req.session.user;
    const alumniInstance = await Alumni.findOne({ where: { email } });
    if (!alumniInstance) {
        return res.status(404).send('Alumni not found');
    }

    const oldpath = alumniInstance.gambar;
    const id = alumniInstance.id;

    if (oldpath) {
        const oldFilePath = path.join('public', oldpath.replace(/^\//, ''));
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
            console.log('Old file deleted successfully');
        }
    }

    if (!req.file) {
        return res.status(400).send('No profile picture provided');
    }

    const filePath = '/' + req.file.path.split(path.sep).slice(1).join('/');
    alumniInstance.gambar = filePath;
    await alumniInstance.save();

    return res.redirect('/alumni/profile');
} catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
}
};

module.exports = {
  form,
  checklogin,
  logout,
  getProfile,
  changePassword,
  signUp,
  renderHome,
  uploadPhoto,
  updatephotoProfile
};
