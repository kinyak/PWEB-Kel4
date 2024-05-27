// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { admins } = require("../../models");
require('dotenv').config();

const form = (req, res) => {
  if (req.session.user) {
    // If the user has a session, redirect to the appropriate page
    if (req.session.user.role === "admin") {
      return res.redirect("/admin/home");
    } else if (req.session.user.role === "alumni") {
      return res.redirect("/home");
    }
  }

  res.render("admin/login", { title: "Login" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await admins.findOne({ where: { email } });
    if (!foundUser) {
      req.flash('error', 'Username or Password Invalid');
      res.render('admin/login', {  title: 'Login Error', messages: req.flash() });
    }
    else {
      const isValidPassword = await bcrypt.compare(password, foundUser.password);
      
      
      if (isValidPassword == true) {
          // Store user data in the session
          req.session.user = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          };
      if (foundUser.role === "admin") {
        return res.redirect("/admin/dashboard");
        } else if (foundUser.role === "alumni") {
          return res.redirect("/alumni/dashboard");
        } else {
          return res.redirect("/home");
        }
      }
      else {
        req.flash('error', 'Username or Password Invalid');
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
    const { role } = req.session.user;

    if (role !== 'admin') {
      return res.status(401).send('Unauthorized');
    }

    const { email } = req.session.user;
    const foundEmail = await admins.findOne({ where: { email } });

    if (!foundEmail) {
      return res.status(404).send('Email not found');
    }

    res.render('admin/profile', { userEmail: email, title: "Profile" });
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
      const user = await admins.findOne({ where: { email } });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Compare old password
      
      const isMatch = await bcrypt.compare(oldpassword, user.password);
        // Proceed with your logic based on whether passwords match
        if (!isMatch) {
          return res.status(400).send("Old password is incorrect");
        }
    
        
        // Update the user record with the new hashed password
        await user.update({ password: await bcrypt.hash(newpassword, 10), });
        next();
      
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).send("Internal server error");
    }
  };


module.exports = {
  form,
  checklogin,
  logout,
  getProfile,
  changePassword
};
