const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

//config handlebars
app.engine('handlebats', exphbs.engine())
app.set('view engine', 'handlebars')
//
app.get('/', (requisicao,resposta)=>{
    resposta.send("Olá Mundo!")
})

app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000")
})