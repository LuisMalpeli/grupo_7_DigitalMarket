const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const path_public = path.resolve(__dirname, 'public')

app.use(express.static(path_public))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))
})

app.listen(port, () => console.log(`Servidor en el puerto: ${port}`))