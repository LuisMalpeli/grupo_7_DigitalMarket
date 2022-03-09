const path = require('path');
//Esta función recibe el nombre del archivo como parámetro y 
//retornará true si la extensión del archivo recibida es váilda
// y retornará false si la extensión no es válida

module.exports = {
    errorMsg:null, //errorMsg almacenará el mensaje de error en caso de ocurrir
    fileCheck: function (file) {
        //fileCheck es la función encargada de hacer la validación de extensiones
        const extensionesValidas = ['.png','.jpg','.jpeg','.gif']
        let ext = path.extname(file);
        let extValida = extensionesValidas.find(element => element == ext);
            if (!extValida) {
                //Si extValida es undefined, quiere decir que la extensión no está permitida
                this.errorMsg = 'Los formatos permitidos para la imagen son .png, .jpg, .jpeg y .gif'
                return false

            }
            this.errorMsg = null
            return true
        
    }
}   