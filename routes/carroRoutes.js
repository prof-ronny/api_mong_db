const express = require('express');
const router = express.Router();
const Carro = require('../models/carro');

// Rota para obter todos os carros
router.get('/', async (req, res) => {
  try {
    console.log('Requisição recebida para obter todos os carros');
    const carros = await Carro.find();
    console.log('Carros encontrados:', carros);
    res.json(carros.map(carro => ({
      id: carro.id,
      marca: carro.marca,
      modelo: carro.modelo,
      ano: carro.ano,
      cor: carro.cor,
      tipo_combustivel: carro.tipo_combustivel,
      quilometragem: carro.quilometragem,
      foto_url: carro.foto_url,
      preco: carro.preco,
    })));
  } catch (err) {
    console.error('Erro ao obter carros:', err);
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um carro por ID
router.get('/:id', getCarro, (req, res) => {
  console.log('Carro encontrado:', res.carro);
  res.json({
    marca: res.carro.marca,
    modelo: res.carro.modelo,
    ano: res.carro.ano,
    cor: res.carro.cor,
    tipo_combustivel: res.carro.tipo_combustivel,
    quilometragem: res.carro.quilometragem,
    foto_url: res.carro.foto_url,
    preco: res.carro.preco,
  });
});

// Rota para criar um novo carro
router.post('/', async (req, res) => {
  console.log('Requisição recebida para criar um novo carro:', req.body);
  const carro = new Carro({
    marca: req.body.marca,
    modelo: req.body.modelo,
    ano: req.body.ano,
    cor: req.body.cor,
    tipo_combustivel: req.body.tipo_combustivel,
    quilometragem: req.body.quilometragem,
    foto_url: req.body.foto_url,
    preco: req.body.preco,
  });

  try {
    const newCarro = await carro.save();
    console.log('Novo carro criado:', newCarro);
    res.status(201).json({
      marca: newCarro.marca,
      modelo: newCarro.modelo,
      ano: newCarro.ano,
      cor: newCarro.cor,
      tipo_combustivel: newCarro.tipo_combustivel,
      quilometragem: newCarro.quilometragem,
      foto_url: newCarro.foto_url,
      preco: newCarro.preco,
    });
  } catch (err) {
    console.error('Erro ao criar carro:', err);
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um carro por ID
router.put('/:id', getCarro, async (req, res) => {
  console.log('Requisição recebida para atualizar carro com ID:', req.params.id);
  if (req.body.marca != null) {
    res.carro.marca = req.body.marca;
  }
  if (req.body.modelo != null) {
    res.carro.modelo = req.body.modelo;
  }
  if (req.body.ano != null) {
    res.carro.ano = req.body.ano;
  }
  if (req.body.cor != null) {
    res.carro.cor = req.body.cor;
  }
  if (req.body.tipo_combustivel != null) {
    res.carro.tipo_combustivel = req.body.tipo_combustivel;
  }
  if (req.body.quilometragem != null) {
    res.carro.quilometragem = req.body.quilometragem;
  }
  if (req.body.foto_url != null) {
    res.carro.foto_url = req.body.foto_url;
  }
  if (req.body.preco != null) {
    res.carro.preco = req.body.preco;
  }

  try {
    const updatedCarro = await res.carro.save();
    console.log('Carro atualizado:', updatedCarro);
    res.json({
      marca: updatedCarro.marca,
      modelo: updatedCarro.modelo,
      ano: updatedCarro.ano,
      cor: updatedCarro.cor,
      tipo_combustivel: updatedCarro.tipo_combustivel,
      quilometragem: updatedCarro.quilometragem,
      foto_url: updatedCarro.foto_url,
      preco: updatedCarro.preco,
    });
  } catch (err) {
    console.error('Erro ao atualizar carro:', err);
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um carro por ID
router.delete('/:id', getCarro, async (req, res) => {
  console.log('Requisição recebida para excluir carro com ID:', req.params.id);
  try {
    await res.carro.deleteOne();
    console.log('Carro excluído com sucesso!');
    res.json({ message: 'Carro excluído com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir carro:', err);
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obter um carro por ID
async function getCarro(req, res, next) {
  console.log('Buscando carro com ID:', req.params.id);
  try {
    const carro = await Carro.findById(req.params.id);
    if (carro == null) {
      console.log('Carro não encontrado com ID:', req.params.id);
      return res.status(404).json({ message: 'Carro não encontrado' });
    }
    res.carro = carro;
    next();
  } catch (err) {
    console.error('Erro ao buscar carro:', err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
