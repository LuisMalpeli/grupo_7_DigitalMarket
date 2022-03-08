const multer  = require('multer')
const path = require('path')
const productPath = path.resolve(__dirname,'../../public/img/productos') 
const userPath = path.resolve(__dirname,'../../public/img/users')

const uploadFilter = function (req, file, cb) {
  let extPermitidas = ['.png','.jpg','.jpeg','.gif']
  let extValida = extPermitidas.find(element => element == path.extname(file.originalname));
  if (!extValida) {
    ///Si extValida es undefined, quiere decir que la extensión no está permitida
    cb(null, false); //Los archivos serán rechazados
  }else {
    cb(null, true); //Los archivos serán aceptados
  }

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname == 'avatar') {
        //si la imagen se llama avatar quiere decir que el llamado viene desde la creación de un usuario
        //entonces se debe usar el userPath
        cb(null, userPath)
      } else {
        //caso contrario quiere decir que vendrá desde la creación de un producto, por ende se almacenará en productos
        cb(null, productPath)
      }
      
    }, 
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ 
    storage: storage,
    fileFilter: uploadFilter
  })


module.exports = upload
