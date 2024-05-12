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



module.exports = {
  form,
  checklogin,
  getProfile,
};
