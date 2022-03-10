const express = require('express')
const cookieParser = require('cookie-parser');
const methodOverride =  require('method-override');
const session = require('express-session')
const app = express()
const path = require('path')


const mainRouter = require('./routes/mainRouter')
const productRouter = require('./routes/productsRouter')
const userRouter = require('./routes/usersRouter')
const apiRouter = require('./routes/apiRouter')

const recordarmeMiddleware = require('./middleware/recordarme')
const userIsLogged = require ('./middleware/userLoggedMiddleware')

const port = 3000

//Seteo de EJS y dónde están las views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));

//JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Cookies
app.use(cookieParser());

app.use(session({
    secret: 'LaClaveSecretaJaJa',
    resave: false,
    saveUninitialized: false,
}))

//METODOS
app.use(methodOverride('_method'));

app.listen(process.env.PORT || port, ()=>{
    console.log('Servidor corriendo en el puerto : ',port);
});
app.use(express.static(path.resolve(__dirname,'../public')));
app.use(recordarmeMiddleware);
app.use (userIsLogged);

app.use('/', mainRouter)
app.use('/products', productRouter)
app.use('/user', userRouter)
app.use('/api', apiRouter)