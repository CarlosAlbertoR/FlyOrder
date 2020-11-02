const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

//Routes
app.use('/', require('./routes/app'));

app.listen(app.get('port'), () =>{
    console.log('Server on port: ', app.get('port'))
});