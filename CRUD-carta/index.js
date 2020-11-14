const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

//Inicializaciones
const app = express();
app.use(cors());
require('./src/settings/db');

//Configuraciones
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

//Routes
app.use('/', require('./src/routes/app'));

//Iniciando el servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port: ', app.get('port'));
});