const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
    min: 1886, // The year the first car was invented
    max: new Date().getFullYear(), // Current year
  },
  cor: {
    type: String,
    required: true,
  },
  tipo_combustivel: {
    type: String,
    required: true,
  },
  quilometragem: {
    type: Number,
    required: true,
    min: 0, // No negative mileage
  },
  preco: {
    type: Number,
    required: true,
    min: 0, // No negative price
  },
  foto_url: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Carro = mongoose.model('Carro', carroSchema);

module.exports = Carro;
