function guestMiddleware (req, res, next) {
    if(req.session.usuarioLogueado) { 
        return res.redirect('profile')
        //Redurecciona a 'profile' porque cuando el usuario accede a este middleware, ya está ingresando por '/user', desde el login o register

    }
    next ();
}

module.exports = guestMiddleware