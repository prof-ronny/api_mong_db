const request = require("supertest");
const {app, server} = require("../app"); // Certifique-se de que o caminho esteja correto

describe("Testes de Rotas Sistemaa de Biblioteca", () => {

    afterAll(() => {
        server.close(); // Close the server after all tests
      });

  it("Deve listar todos os livros (GET /biblioteca)", async () => {
    const response = await request(app).get("/biblioteca");

    expect(response.statusCode).toEqual(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it("Deve cadastrar um novo livro com campos válidos (POST /biblioteca)", async () => {
    const newBook = {
      titulo: "O Senhor dos Anéis",
      editora: "Martins Fontes",
        autor: "J.R.R. Tolkien",
        genero: "Fantasia",
        ano: 1954,
        isbn: "978-0-395-19395-2",
    };

    const response = await request(app).post("/biblioteca").send(newBook);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("_id");
  });

  it("Deve retornar erro ao criar um novo livro com campos inválidos (POST /biblioteca)", async () => {
    const invalidBook = {
      titulo: "O Livro de Eli",
        editora: "Martins Fontes",
    };

    const response = await request(app).post("/biblioteca").send(invalidBook);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Deve retornar erro ao acessar uma rota inexistente (GET /rota-inexistente)", async () => {
    const response = await request(app).get("/rota-inexistente");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
