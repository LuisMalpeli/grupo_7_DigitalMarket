const multer  = require('multer')
const path = require('path')
const productPath = path.resolve(__dirname,'../../public/img/productos') 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, productPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })


module.exports = upload
