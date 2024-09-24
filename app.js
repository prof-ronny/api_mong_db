const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const carroRouter = require('./routes/carroRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use carroRouter for routes under '/carros'
app.use('/carros', carroRouter);

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao MongoDB!');
  } catch (err) {
    console.error('Erro de conexão ao MongoDB:', err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

connectToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Algo deu errado!' });
});
