function guestMiddleware (req, res, next) {
    if(req.session.usuarioLogueado) { 
        return res.redirect('user/profile')
        //esta función debería redirecctionar al usuario a su perfil
        //return res.redirect('/user/profile') -->Todavía no esta creada
    }
    next ();
}

module.exports = guestMiddleware