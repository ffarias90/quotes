const express = require("express");
const session = require('express-session');
const app = express();
const port = 8000;

app.use('/static', express.static('static'))
    //para el uso de variables POST en req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'tupalabrasecreta' }));

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(require('./routes/principal'));




app.listen(port, () => console.log(`Listening on port: ${port}`));