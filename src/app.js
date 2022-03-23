const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride =  require('method-override'); //para poder usar los metodos PUT y DELETE
const session = require('express-session');
const app = express();
const path = require('path'); // para las rutas

// Importación de las rutas(4) 
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productsRouter');
const userRouter = require('./routes/usersRouter');
const apiRouter = require('./routes/apiRouter');
//Importacion de middleware(2)
const recordarmeMiddleware = require('./middleware/recordarme');
const userIsLogged = require ('./middleware/userLoggedMiddleware');

const port = 3000; // puerto localhost

//Seteo(configuracion para que funcione) de EJS y dónde están las views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));

//JSON , para capturare la informacion de los POST y poder trabajar con los datos de sus formularios. todo lo que llega de un formulario
// queremos capturarlo en forma de objeto literal y poder convertir en JSON
app.use(express.json()); // MIDDLEWARE JSON que nos permite usar esta estructura en el proyecto.
app.use(express.urlencoded({extended:false}));

// Cookies
app.use(cookieParser());

app.use(session({ //identificador único de la session del usuario, se configura como middleware a nivel aplicación.
    secret: 'LaClaveSecretaJaJa',
    resave: false,
    saveUninitialized: false,
}));

//Métodos
app.use(methodOverride('_method')); // sobreescribe el metodo original y así poder implementar metodo PUT y DELETE.

app.listen(process.env.PORT || port, ()=>{
    console.log('Servidor corriendo en el puerto : ',port);
});
app.use(express.static(path.resolve(__dirname,'../public'))); // middleware a nivel global apiclacion para resolver/encontrar los archivos estaticos
app.use(recordarmeMiddleware);// middleware logueo de usuario/session
app.use (userIsLogged);// middleware del usuario esta loqueado/session

app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);

// nuestro punto de entrada que contiene todos los módulos de la aplicación.