const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
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
  },
  foto_url: {
    type: String,
    required: false,
  },
});

const Carro = mongoose.model('Carro', carroSchema);

module.exports = Carro;
