const Sequelize = require('sequelize');
// traemos el constructor de cada modelo
const QuoteModel = require('./models/quote');

// creamos la conexion a la base de datos
const sql = new Sequelize('quotes', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

// aca inicializamos los modelos
const Quote = QuoteModel(sql, Sequelize);

// sincronizamos nuestro codigo con la base de datos
sql.sync()
    .then(() => {
        console.log('base de datos y tablas creadas');
    });

// finalmente listamos los modelos que queremos exportar    
module.exports = {
    Quote,
};