//const express = require('express');

const Customer = require('../models/local-customer');
const pool = require('../settings/db')


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

let error = (req, res) => {
    res.send('El cliente ya se encuentra registrado');
};

module.exports = {
    listCustomer, error
}