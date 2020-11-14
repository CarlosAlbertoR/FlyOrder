const Customer = require('../models/local-customer');

function getCustomer (req, res) {
  let customerId = req.params.customerId

  Customer.findById(customerId, (err, customer) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición : ${err}`})
    if (!customer) return res.status(404).send({message: `El cliente no existe`})

    return res.status(200).send({ customer })
  })
}

function getCustomers (req, res) {
  Customer.find({}, (err, customers) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!customers) return res.status(404).send({message: 'No existen clientes'})

   return res.send(200, { customers })
  })
}

function updateCustomer (req, res) {
  let customerId = req.params.customerId
  let update = req.body

  Customer.findByIdAndUpdate(customerId, update, (err, customerUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el cliente: ${err}`})

    return res.status(200).send({ customer: customerUpdated })
  })
}

function deleteCustomer (req, res) {
  let customerId = req.params.customerId

  Customer.findById(customerId, (err, customer) => {
    if (err) res.status(500).send({message: `Error al eliminar el cliente: ${err}`})

    customer.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el cliente: ${err}`})
      res.status(200).send({message: 'El cliente ha sido eliminado'})
    })
  })
}

function search(req,res)
  {
  let readLyrics = req.body.name
  if(readLyrics==undefined) {
    return res.status(400).send({message: 'Debe Escribir una letra'})
  }
    // Search
  Customer.find({name:{ $regex: readLyrics + '.*'}}, (err, customers) => {
  if (err) return res.status(500).send({message: ` error al  realizar la petición: ${err}`})
  if (!customers) return res.status(404).send({message: 'No existen clientes'})

  return res.status(200).send({ customers });
 })
}

let error = (req, res) => {
    res.send('El usuario no se pudo verificar');
};

module.exports = {
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  search,
  error
}