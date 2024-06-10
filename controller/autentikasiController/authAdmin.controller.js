// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { admin } = require("../../models");
require('dotenv').config();
const fs = require('fs');

const form = (req, res) => {
  if (req.session.user) {
    // If the user has a session, redirect to the appropriate page
    if (req.session.user.role === 1) {
      return res.redirect("/admin/dashboard");
    } else if (req.session.user.roleId === 2) {
      return res.redirect("/alumni/home");
    } else {
      return res.redirect("/home");
    }
  }

  res.render("admin/login", { title: "Login" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await admin.findOne({ where: { email } });
    if (!foundUser) {
      req.flash('error', 'Username atau Password Invalid');
      res.render('admin/login', {  title: 'Login Error', messages: req.flash() });
    }
    else {
      const isValidPassword = await bcrypt.compare(password, foundUser.password);
      
      
      if (isValidPassword == true) {
          // Store user data in the session
          req.session.user = {
            id: foundUser.id,
            email: foundUser.email,
            roleId: foundUser.roleId,
          };
      if (foundUser.role === 1) {
        return res.redirect("/admin/dashboard");
        } else if (foundUser.role === "alumni") {
          return res.redirect("/alumni/home");
        } else {
          return res.redirect("/home");
        }
      }
      else {
        req.flash('error', 'Username atau Password Invalid');
        res.render('admin/login', { title: 'Login Error', messages: req.flash() });
      }
    }
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error ketika logout:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    // Redirect to the login page
    return res.redirect('/auth/login/admin');
  });
}


const getProfile = async (req, res, next) => {
  try {
    const { roleId, email, id } = user;

    if (role !== 1) {
      req.flash('Unauthorized', 'Pengguna Tidak Izinkan');
      return res.render('admin/profile', { title: 'Unauthorized', messages: req.flash() });
    }

    const foundUser = await admin.findOne({ where: { email } });

    if (!foundUser) {
      req.flash('error', 'Username atau Password Invalid');
      return res.render('admin/profile', { title: 'Unauthorized', messages: req.flash() });
    }
    const filepath = foundUser.gambar;
    return res.render('admin/profile', {
      userID: id,
      path: filepath,
      userEmail: email,
      title: 'Profile',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


  const changePassword = async (req, res, next) => {
    const { email } = req.session.user;
    const {oldpassword, newpassword } = req.body;
    
    try {
      // Retrieve the user from the database
      const user = await admin.findOne({ where: { email } });
  
      // Check if the user exists
      if (!user) {
        req.flash('notfound', 'Username tidak ditemukan');
        return res.render('admin/profile', {  title: 'Unauthorized', messages: req.flash() });
      }
  
      // Compare old password
      
      const isMatch = await bcrypt.compare(oldpassword, user.password);
        // Proceed with your logic based on whether passwords match
        if (!isMatch) {
          req.flash('error', 'Username atau Password Invalid');
          return res.render('admin/profile', {  title: 'Unauthorized', messages: req.flash() });
        }
    
        
        // Update the user record with the new hashed password
        await user.update({ password: await bcrypt.hash(newpassword, 10), });
        next();
      
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).send("Internal server error");
    }
  };

  
  const updatephotoProfile = async (req, res) => {
    try {
    const { email } = req.session.user;
      const adminInstance = await admin.findOne({ where: { email } });
      if (!adminInstance) {
        return res.status(404).send('Admin not found');
      }
  
      const oldpath = adminInstance.gambar;
      const foundEmail = adminInstance.email; 
      const id = adminInstance.id;
      const oldFilePath = `public${oldpath.replace(/\//g, '\\')}`;

    if (oldFilePath) {
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error(`Error deleting old file: ${err}`);
        } else {
          console.log('Old file deleted successfully');
        }
      });
    }

      // Update profile picture if provided
      if (req.file) {
        const filePath = `/${req.file.path.replace(/public\\/g, '').replace(/\\/g, '/')}`;
        adminInstance.gambar = filePath;
        await adminInstance.save();
        return res.redirect(`/admin/profile`);
      }
  
      return res.status(400).send('No profile picture provided');
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
  updatephotoProfile
};
