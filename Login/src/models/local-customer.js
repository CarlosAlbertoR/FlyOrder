const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

customerSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

customerSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('customer', customerSchema);