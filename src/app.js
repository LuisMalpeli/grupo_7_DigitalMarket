const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const mainRouter = require('./routes/main')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')


//Seteo de EJS yu dónde están las views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));

app.listen(process.env.PORT || port, ()=>{
    console.log('Servidor corriendo en el puerto : ',port);
});
app.use(express.static(path.resolve(__dirname,'../public')));

app.use('/',mainRouter)
app.use('/product', productRouter)
app.use('/user',userRouter)

/*
app.get('/login',(req,res) => {
    res.sendFile(path.join(pathHTML + 'login.html'))
})

app.get('/register',(req,res) => {
    res.sendFile(path.join(pathHTML + 'register.html'))
})

app.get('/productDetail',(req,res) => {
    res.sendFile(path.join(pathHTML + 'productDetail.html'))
})

app.get('/productCart',(req,res) => {
    res.sendFile(path.join(pathHTML + 'productCart.html'))
})
*/