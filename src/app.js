const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const pathHTML = path.join(__dirname, '/views/')

app.use(express.static(path.resolve(__dirname,'../public')));

app.listen(process.env.PORT || port, ()=>{
    console.log('Servidor corriendo en el puerto : ',port);
});

app.get('/',(req,res) => {
    res.sendFile(path.join(pathHTML + 'index.html'))
})

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