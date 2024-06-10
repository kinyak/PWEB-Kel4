async function isAuthorized(req, res, next) {
    try {
        if (req.session.user) {
        req.userId = await req.session.user.id;
        req.userRoleId =await  req.session.user.roleId;
        req.userEmail = await req.session.user.email;
    
        if (1 && req.userRoleId !== 1) {
            return res.status(403).send('Unauthorized'); // Forbidden
        }
    
        if (req.userRoleId === 2) {
            return res.redirect("/alumni/home");
        } else if (req.userRoleId === 1) {
            // You can perform any asynchronous operations here before calling next()
            next();
        } else {
            return res.redirect("/home");
        }
        } else {
        // Handle the case when the user is not logged in or the session is not initialized
        return res.redirect('/home');
        }
    } catch (error) {
        // Handle any errors that occur within the function
        console.error('Error in isAuthorized middleware:', error);
        return res.status(500).send('Internal Server Error');
    }
    }
    
    module.exports = isAuthorized;