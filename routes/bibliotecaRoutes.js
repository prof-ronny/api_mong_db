const express = require('express');
const router = express.Router();
const Biblioteca = require('../models/biblioteca');

// Rota para obter todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Biblioteca.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um livros por ID
router.get('/:id', getLivro, (req, res) => {
  res.json(res.livros);
});

// Rota para criar um novo livros
router.post('/', async (req, res) => {
  const livros = new Biblioteca({
    titulo: req.body.titulo,
    edito: req.body.editora,
    autor: req.body.autor,
    genero: req.body.genero,
    ano: req.body.ano,
    isbn: req.body.isbn,
  });

  try {
    const newLivro = await livros.save();
    res.status(201).json(newLivro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um livros por ID
router.put('/:id', getLivro, async (req, res) => {
  if (req.body.nome != null) {
    res.livros.nome = req.body.nome;
  }
  if (req.body.email != null) {
    res.livros.email = req.body.email;
  }
  if (req.body.telefone != null) {
    res.livros.telefone = req.body.telefone;
  }
  if (req.body.endereco != null) {
    res.livros.endereco = req.body.endereco;
  }
  if (req.body.foto != null) {
    res.livros.foto = req.body.foto;
  }

  try {
    const updatedLivro = await res.livros.save();
    res.json(updatedLivro);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um livros por ID
router.delete('/:id', getLivro, async (req, res) => {
  try {
    await res.livros.deleteOne();
    res.json({ message: 'Livro excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getLivro(req, res, next) {
  try {
    const livros = await Biblioteca.findById(req.params.id);
    if (livros == null) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.livros = livros;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
