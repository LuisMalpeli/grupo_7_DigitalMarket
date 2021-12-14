const express = require('express')
const cookieParser = require('cookie-parser');
const methodOverride =  require('method-override');
const app = express()
const path = require('path')
const port = 3000
const mainRouter = require('./routes/mainRouter')
const productRouter = require('./routes/productsRouter')
const userRouter = require('./routes/usersRouter')


//Seteo de EJS yu dónde están las views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));

//JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//METODOS
app.use(methodOverride('_method'));


app.listen(process.env.PORT || port, ()=>{
    console.log('Servidor corriendo en el puerto : ',port);
});
app.use(express.static(path.resolve(__dirname,'../public')));

app.use('/',mainRouter)
app.use('/products', productRouter)
app.use('/user',userRouter)
