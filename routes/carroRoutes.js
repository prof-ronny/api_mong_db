const express = require('express');
const router = express.Router();
const Carro = require('../models/carro');

// Middleware to handle async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Rota para obter todos os carros
router.get('/', asyncHandler(async (req, res) => {
  const carros = await Carro.find();
  res.json(carros);
}));

// Rota para obter um carro por ID
router.get('/:id', getCarro, (req, res) => {
  res.json(res.carro);
});

// Rota para criar um novo carro
router.post('/', asyncHandler(async (req, res) => {
  const carro = new Carro(req.body);
  const newCarro = await carro.save();
  res.status(201).json(newCarro);
}));

// Rota para atualizar um carro por ID
router.put('/:id', getCarro, asyncHandler(async (req, res) => {
  Object.assign(res.carro, req.body); // Merge incoming data with existing
  const updatedCarro = await res.carro.save();
  res.json(updatedCarro);
}));

// Rota para excluir um carro por ID
router.delete('/:id', getCarro, asyncHandler(async (req, res) => {
  await res.carro.deleteOne();
  res.json({ message: 'Carro excluído com sucesso!' });
}));

// Middleware para obter um carro por ID
async function getCarro(req, res, next) {
  const carro = await Carro.findById(req.params.id);
  if (!carro) {
    return res.status(404).json({ message: 'Carro não encontrado' });
  }
  res.carro = carro;
  next();
}

module.exports = router;
