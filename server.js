const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true })) // Responsavel por fazer funcionar meu req.body.
server.use(express.static('public')) // Responsavel por ter acesso as arquivos Js,Css, etc.. na pasta Public.
server.use(methodOverride('_method'))
server.use(routes) // Resaponsavel por trazer as rotas.

server.set("view engine", "njk")
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function() {
    console.log("Server is running")
})

