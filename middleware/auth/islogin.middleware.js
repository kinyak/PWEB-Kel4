function isLogin(req, res, next) {
  if (req.session.user) {
    req.userId = req.session.user.id;
    req.userRoleId = req.session.user.roleId;
    req.userEmail = req.session.user.email;

    if (req.userRoleId === 2) {
      return res.redirect("/alumni/home");
    } else if (req.userRoleId === 1) {
      return res.redirect("/admin/dashboard");
    } else {
      return res.redirect("/home");
    }
  }

  next();
}

module.exports = isLogin;