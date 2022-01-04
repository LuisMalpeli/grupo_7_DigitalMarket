function loggedMiddleware (req, res, next) {
    if(!req.session.usuarioLogueado) { 
        return res.redirect('login')
        //Redurecciona a 'login' porque cuando el usuario accede a este middleware, ya está ingresando por '/user', desde el perfil o logout

    }
    next ();
}

module.exports = loggedMiddleware