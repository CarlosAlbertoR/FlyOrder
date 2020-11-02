//const express = require('express');

const Costumer = require('../models/local_costumer');
const pool = require('../settings/db')


let listCostumer = async (req, res) => {
    const model = await Costumer.find();
    Costumer.countDocuments({},(err, total) => {
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
    res.send('El usuario ya se encuentra registrado');
};

module.exports = {
    listCostumer, error
}