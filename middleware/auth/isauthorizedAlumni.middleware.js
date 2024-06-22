async function isAuthorized(req, res, next) {
    try {
        if (req.session.user) {
        req.userId = await req.session.user.id;
        req.userRoleId =await  req.session.user.roleId;
        req.userEmail = await req.session.user.email;
    
        if (2 && req.userRoleId !== 2) {
            req.flash('error', 'Unauthorized'); 
            return res.redirect('/auth/login/alumni'); 
        }

        else {
            if (req.userRoleId === 2) {
                next();
            }
        }

    }
    else {

        return res.redirect('/home');
        }
    } catch (error) {
        console.error('Error in isAuthorized middleware:', error);
        return res.status(500).send('Internal Server Error');
    }
    }
    
    module.exports = isAuthorized;