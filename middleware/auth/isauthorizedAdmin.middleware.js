async function isAuthorized(req, res, next) {
try {
    if (req.session.user) {
    req.userId = await req.session.user.id;
    req.userRoleId =await req.session.user.roleId;
    req.userEmail = await req.session.user.email;
    if (1 && req.userRoleId !== 1) {
        req.flash('error', 'Unauthorized'); 
        return res.redirect('/auth/login/admin'); 
    }
    else {
        if (req.userRoleId === 1) {
            next();
            }
        }
    }
    else {
        return res.redirect("/home");
    }
    
}

    catch (error) {
    console.error('Error in isAuthorized middleware:', error);
    return res.status(500).send('Internal Server Error');
}
}

module.exports = isAuthorized;