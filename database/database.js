const Sequelize = require('sequelize');
const connection = new Sequelize('flashcards', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});



module.exports = connection;