// IMPORTANDO DEPENDENCIAS
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const PerguntaModel = require('./database/models/Pergunta');
const Pergunta = require("./database/models/Pergunta");
const Resposta = require("./database/models/Resposta");

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com DB bem sucedida!");
  })
  .catch((err) => {
    console.log(`Ocorreu algum erro: ${err}`);
  });

const port = 8080; /* PORTA PADRÃO */

/*  Configurando o EJS com o Express  */
app.set("view engine", "ejs");
app.use(express.static("public")); /* usando esse metodo o express permite que
seja utilizado arquivo css, javascript no frontend, arquivos de imagens e etc */

// BODYPARSER
app.use(
  bodyParser.urlencoded({ extended: false })
); /* confiuguração do body parser */
app.use(bodyParser.json());





//
// ROTAS
//
app.get("/", (req, res) => {

  // LISTANDO OS DADOS DO BANCO DE DADOS NO FRONT
  Pergunta.findAll({raw: true, order: [['id', 'DESC' ]]})/* Metodo responsável por procurar todas as perguntas guardadas no banco de dados */
  .then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  })
  
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {/* Recebendo os dados da pergunta */
  
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  /* Metodo responsável por salvar um módulo na tabela */
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {   /* Dessa maneira após guardar os dados dentro do banco de dados o usuário é redirecionando para a página pincipal */
    res.redirect('/')
  })
});

app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id;

  Pergunta.findOne({
    where: {id: id},

  }).then(pergunta => {
    if(pergunta != undefined){

      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [
          ['id', 'DESC']
        ]
      }).then((respostas) => {
        res.render('pergunta.ejs', {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    }else{
      res.redirect('/')
    }
  })
});


app.post('/responder', (req, res) => {
  var corpo = req.body.corpo
  var perguntaId = req.body.perguntaId

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  })
  .then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  });
});


//
// START DO SERVIDOR
//
app.listen(port, (err) => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  if (err) {
    console.log(`Ocorreu um erro: ${err}`);
  }
});
 