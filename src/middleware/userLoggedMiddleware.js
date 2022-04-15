function userIsLogged (req, res, next) {
    //declaro que el usuario NO está loggueado
    res.locals.isLogged = false;

    if(req.session && req.session.usuarioLogueado) {
        //si hay una session iniciada, y tengo un usuario guardado en session, declaro que hay un usuario logueado
        res.locals.isLogged = true
        res.locals.usuarioLogueado = req.session.usuarioLogueado
    }

    next ();
}

module.exports = userIsLogged;// (userIsLogged= el usuario esta registrado=usuarioLogueado)