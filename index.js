const express = require('express')
const app = express()

const port = 8080


/*  Configurando o EJS com o Express  */
app.set('view engine', 'ejs');

app.get('/:nome/:lang', (req ,res) => {

    var nome = req.params.nome
    var lang = req.params.lang
    var exibirMSG = false

    var produtos = [
        {nome: 'Doritos', preco: 3.14},
        {nome: 'Coca-cola', preco: 5},
        {nome: 'Leite', preco: 1.45},
        {nome: 'Redbull', preco: 6},
        {nome: 'Carne', preco: 15},
        {nome: 'Nescau', preco: 4.30}

    ]


    res.render('index.ejs',{
        nome: nome,
        lang: lang,
        empresa: 'Dev pro',
        salario: '1000',
        msg: exibirMSG,
        produtos: produtos

    })
})

app.listen(port, (err) => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    if(err){
        console.log(`Ocorreu um erro: ${err}`)
    }
})