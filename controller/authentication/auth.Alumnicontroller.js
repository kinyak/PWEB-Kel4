// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { alumni } = require("../../models");
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

  res.render("alumni/login", { title: "Login Alumni" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const foundUser = await alumni.findOne({ where: { email } });

    if (!foundUser) {
      req.flash('error', 'Username or Password Invalid');
      res.render('alumni/login', {  title: 'Login Error', messages: req.flash() });
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
      return res.redirect("/alumni/home");
    } else {
      return res.redirect("/home");
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
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error ketika logout:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    // Redirect to the login page
    return res.redirect('/auth/login/alumni');
  });
}


const getProfile = async (req, res, next) => {
  try {
    
    const { role } = req.session.user;
    if ({ role } != admin) {
      return res.status(401).send('Unauthorized');
    }

    console.log(req.session.user);
    const { email } = req.session.user;
    const foundEmail = await alumnis.findOne({ where: { email } });

    if (!foundEmail) {
      return res.status(404).send('Email not found');
    }

    res.render('profile', { userEmail: email, title: "Profile" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


  const changePassword = async (req, res, next) => {
    email = req.userEmail
    const {oldpassword, newpassword } = req.body;
    
    try {
      // Retrieve the user from the database
      const user = await alumnis.findOne({ where: { email } });
  
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


  const signUp = async (req, res, next) => {
    const { email, password, confirmedPassword } = req.body;
  
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).send("Email already exists");
      }
  
      // Validate password and confirmedPassword
      if (password !== confirmedPassword) {
        return res.status(400).send("Passwords do not match");
      }

      else {

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
  
      // Additional logic or response if needed
      return res.status(201).json(newUser);
      }
        } catch (error) {
      console.error("Error during signup:", error);
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
