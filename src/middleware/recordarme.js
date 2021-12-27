const Users = require('../models/Users')

function recordarmeMiddleware(req, res, next) {
    //Si el usuario NO está logueado, pero hizo click en recordarme
    if(req.session.usuarioLogueado == undefined && req.cookies.recordarme != undefined) {
        //La cookie solo almacena el mail del usuario, por lo que debo buscarlo para loguearlo
        let usuarioALoguear = Users.findByField("email", req.cookies.recordarme);
        //almacena el usuario a loguear dentro de session
        req.session.usuarioLogueado = usuarioALoguear
    }
    next();


}

module.exports = recordarmeMiddleware;