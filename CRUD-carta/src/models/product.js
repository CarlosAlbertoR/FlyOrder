
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Establishment = require('../../../Login/src/models/local-establishment');

const ProductSchema = Schema({
  name: {type: String, required: true},
  picture: String,
  category: { type: String, required: true },
  price: { type: Number, required: true },
  establishmentID: { type: Schema.Types.ObjectId, ref: Establishment, required:true },
  description: String
});

module.exports = mongoose.model('Product', ProductSchema);