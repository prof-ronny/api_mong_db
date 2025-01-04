# API de Gerenciamento de Carros

Este projeto é uma API para gerenciar informações sobre carros, construída com **Node.js** e **Express**. A API permite realizar operações CRUD (Criar, Ler, Atualizar, Excluir) em um banco de dados MongoDB, facilitando o gerenciamento de carros.

## Funcionalidades

A API oferece as seguintes funcionalidades:

- **GET /carros**: Retorna uma lista de todos os carros cadastrados.
- **GET /carros/:id**: Retorna um carro específico baseado no ID fornecido.
- **POST /carros**: Cria um novo carro com os dados fornecidos.
- **PUT /carros/:id**: Atualiza as informações de um carro existente baseado no ID fornecido.
- **DELETE /carros/:id**: Exclui um carro baseado no ID fornecido.

## Modelo de Dados

A estrutura de dados de cada carro é definida pelo modelo `Carro`, que inclui os seguintes campos:

- **marca**: A marca do carro (string, obrigatório).
- **modelo**: O modelo do carro (string, obrigatório).
- **ano**: O ano de fabricação do carro (número, obrigatório).
- **cor**: A cor do carro (string, obrigatório).
- **tipo_combustivel**: O tipo de combustível do carro (string, obrigatório).
- **quilometragem**: A quilometragem do carro (número, obrigatório, valor mínimo 0).
- **preco**: O preço do carro (número, obrigatório, valor mínimo 0).
- **foto_url**: URL de uma foto do carro (string, opcional).

### Exemplo de um Carro

json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2020,
  "cor": "Preto",
  "tipo_combustivel": "Gasolina",
  "quilometragem": 30000,
  "preco": 85000,
  "foto_url": "https://exemplo.com/foto.jpg"
}

## Dependências

Este projeto utiliza as seguintes dependências:

- **express**: Framework para criação de APIs em Node.js.
- **mongoose**: Biblioteca para trabalhar com MongoDB em Node.js.
- **asyncHandler**: Middleware para tratar erros assíncronos de forma simplificada.

Para instalar as dependências, basta executar o comando:

```bash
npm install
