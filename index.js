const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

//config handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
//

app.use(express.static('public'))

app.get('/', (requisicao,resposta)=>{
    resposta.render('home')
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: 3306 //ou 3307
})

