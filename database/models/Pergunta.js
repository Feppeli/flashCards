const Sequelize = require('sequelize');
const connection = require('../database');

const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false

    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false})
.then(() =>{
    console.log('Tabela criada com sucesso!')
})
.catch((err) => {
    console.log(`Ocorreu algum erro ao criar a tebala no database: ${err}`)
})

module.exports = Pergunta