const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const pathHTML = path.join(__dirname, '/views/')

app.use(express.static('public'));


app.get('/',(req,res) => {
    res.sendFile(path.join(pathHTML + 'home.html'))
})

app.get('/login.html',(req,res) => {
    res.sendFile(path.join(pathHTML + 'login.html'))
})

app.get('/register.html',(req,res) => {
    res.sendFile(path.join(pathHTML + 'register.html'))
})

app.get('/productDetail.html',(req,res) => {
    res.sendFile(path.join(pathHTML + 'productDetail.html'))
})

app.get('/productCart.html',(req,res) => {
    res.sendFile(path.join(pathHTML + 'productCart.html'))
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

app.listen(port, () => console.log(`Servidor en el puerto: ${port}`))