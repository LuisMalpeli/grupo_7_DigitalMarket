
const multer  = require('multer');
const path = require('path'); // ayuda a multer a obtener la extensión del archivo original.
const productPath = path.resolve(__dirname,'../../public/img/productos');
const userPath = path.resolve(__dirname,'../../public/img/users');
const extValidator = require('../helpers/extensionValidator');

const uploadFilter = function (req, file, cb) { // filtro del multer
  if(extValidator.fileCheck(file.originalname)){
    //La función retorna true si la extensión es válida
    cb(null, true); //Los archivos serán aceptados
  } else {
    //La función retornará false si la extensión NO es valida
    cb(null,false); //Los archivos serán rechazados
  }
};

const storage = multer.diskStorage({// configuración al almacenamiento de multer
    destination: function (req, file, cb) {
      if(file.fieldname == 'avatar') {
        //si la imagen se llama avatar quiere decir que el llamado viene desde la creación de un usuario
        //entonces se debe usar el userPath
        cb(null, userPath)
      } else {
        //caso contrario quiere decir que vendrá desde la creación de un producto, por ende se almacenará en productos(destination, 1er objeto)
        cb(null, productPath)
      }
      
    }, 
    filename: function (req, file, cb) {// filename indica con que nombre se guardara dicho archivo al servidor
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))// el cb (callback) define en que carpeta quiero almacenar el archivo, 1er parametro null y 2do la ruta hacia la carpeta.
    }// si ni se da un destino queda como un archivo temporal
  }); 
  
  const upload = multer({ 
    storage: storage,
    fileFilter: uploadFilter
  }); // se define la variable multer que sirve como middleware.


module.exports = upload;
