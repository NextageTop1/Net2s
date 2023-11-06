const express = require('express')
const app = express()
const conexao = require("./serve.js")
app.get("/", (req, res) => {
    res.send("ola")
})

app.listen(3000,function(){console.log("funcionando")})