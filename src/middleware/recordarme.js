const Users = require('../database/models/Usuario')
const db = require('../database/models')

function recordarmeMiddleware(req, res, next) {
    //Si el usuario NO está logueado, pero hizo click en recordarme
    if(req.session.usuarioLogueado == undefined && req.cookies.recordarme != undefined) {
        //La cookie solo almacena el mail del usuario, por lo que debo buscarlo para loguearlo
        db.Usuarios.findOne({
            where: {
                email: req.cookies.recordarme
            }
        })
        .then(usuario => {
            let usuarioALoguear = usuario
            //almacena el usuario a loguear dentro de session  
            req.session.usuarioLogueado = usuarioALoguear
        })
        .catch(error => console.log(error.message))
    }
    next();


}

module.exports = recordarmeMiddleware;