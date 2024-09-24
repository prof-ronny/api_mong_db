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
    min: 0,
  },
  preco: {
    type: Number,
    required: true,
    min: 0,
  },
  foto_url: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Carro = mongoose.model('Carro', carroSchema);

module.exports = Carro;
