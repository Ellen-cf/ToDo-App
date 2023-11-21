const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

//config handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
//

app.use(express.static('public'))

 //converter dados do formulario em objeto javascript
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//rotas

app.post('/completar', (requisicao, resposta)=>{
    const id = requisicao.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '1'
        WHERE id = ${id}
    `

    conexao.query(sql, (erro)=>{
        if(erro){
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})

app.post('/criar', (requisicao,resposta)=>{
    const descricao = requisicao.body.descricao
    //tarefa completa? se for falsa é 0
    const completa = 0

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES ('${descricao}', '${completa}')
    `
    conexao.query(sql,(erro)=>{
        if(erro){
            return console.log(erro)
        }

        resposta.redirect('/')
    })

})

app.get('/', (requisicao,resposta)=>{
    //lendo banco de dados
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql,(erro, dados) =>{
        if (erro){
            return console.log(erro)
        }

        //convertendo informação de 0 e 1 que vem do mysql em true ou false para o js
        //então a função map do js vai percorrer cada item da lista que recebemos do post
        const tarefas = dados.map(()=>{
            return{
                id: dados.id,
                descricao: dados.descricao,
                completa: dados.completa === 0 ? false : true //if ternário
            }
        })

        resposta.render('home', { tarefas })
    })    
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: 3306 //ou 3307
})

conexao.connect((erro) =>{
    if (erro){
        return console.log(erro)
    }
    
    console.log("Estou conectado ao mysql")

    app.listen(3000,()=>{
        console.log("Servidor rodando na porta 3000")
    })
})