const mongoose = require('mongoose');

const livro = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  editora: {
    type: String,
    required: false,
  },
  ano: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
});

const Biblioteca = mongoose.model('Biblioteca', livro);
module.exports = Biblioteca;
