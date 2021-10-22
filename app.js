const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const pathHTML = path.join(__dirname, '/views/')

app.use(express.static('public'));

app.get('/',(req,res) => {
    res.sendFile(path.join(pathHTML + 'home.html'))
})

app.listen(port, () => console.log(`Servidor en el puerto: ${port}`))