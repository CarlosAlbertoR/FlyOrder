const Customer = require('../models/local-customer');
const Establishment = require('../models/local-establishment');
const pool = require('../settings/db');

let listCustomer = async (req, res) => {
    const model = await Customer.find();
    Customer.countDocuments({},(err, total) => {
        if(err){
            return res.json({
                status: 400,
                mensaje: "Error al leer el archivo",
                err
            })
        }
        res.json({
            status: 200,
            total,
            model
        })
        console.log(model);
    })
};

let listEstablishment = async (req, res) => {
    const model = await Establishment.find();
    Establishment.countDocuments({},(err, total) => {
        if(err){
            return res.json({
                status: 400,
                mensaje: "Error al leer el archivo",
                err
            })
        }
        res.json({
            status: 200,
            total,
            model
        })
        console.log(model);
    })
};

let error = (req, res) => {
    res.send('El usuario no se pudo verificar');
};

module.exports = {
    listCustomer, listEstablishment, error
}