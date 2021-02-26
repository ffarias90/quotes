const sql = require("../db")

// acá definimos los modelos
module.exports = (sql, type) => {
    return sql.define('quote', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quote: type.STRING,
        author: type.STRING
    });
}