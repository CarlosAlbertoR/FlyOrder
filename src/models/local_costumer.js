const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const costumerSchema = new Schema({
    /*nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    ciudad: { type: String, required: true },
    telefono: { type: String, required: true },
    tipoUsuario: { type: String, required: true },
    */
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

costumerSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

costumerSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = model('costumer', costumerSchema);