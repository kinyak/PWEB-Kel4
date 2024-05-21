const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { admins } = require("../models");

const form = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    // Jika pengguna sudah memiliki token, arahkan ke halaman profil
    return res.redirect("/admin/home");
  }
  res.render("login", { title: "Login" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await admins.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email, role: foundUser.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: 86400 }
    );

    res.cookie("token", token, { httpOnly: true });

    if (foundUser.role == "admin"){
      return res.redirect("/admin/home");
    } 
    else if(foundUser.role == "alumni"){
      return res.redirect("/home");
    }

    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {
    res.clearCookie('token');
    return res.redirect('/auth/login');
  }


  const getProfile = async (req, res, next) => {
    try {
      email = req.userEmail;
      const foundEmail = await admins.findOne({ where: { email } });
  
      if (!foundEmail) {
        return res.status(404).send('email not found');
      }
      userEmail = foundEmail.email
      res.render('profile', { userEmail: userEmail, title: "Profile" });
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
