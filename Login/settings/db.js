const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.set('useFindAndModify',false);
mongoose.connect(mongodb.URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(db => console.log('Database Conected'))
    .catch(err => console.error(err));