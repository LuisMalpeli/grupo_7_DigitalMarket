function guestMiddleware (req, res, next) {
    if(req.session.usuarioLogueado) { 
        return res.redirect('profile')
        //Redirecciona al perfil del usuario porque cuando el usuario accede a este middleware, ya está ingresando por '/user', desde el login o register

    }
    next ();
}

module.exports = guestMiddleware;

// este y el loggedMiddleware.js son lo mismo pero cambia el nombre del midleware... Preguntar bien su función?