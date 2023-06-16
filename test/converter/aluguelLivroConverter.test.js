import { converter } from "../../main/converter/aluguelLivroConverter";
import { Aluguel } from "../../main/domain/aluguel";
import clienteRepository from "../../main/db/clienteRepository"
import livroRepository from "../../main/db/livroRepository"
import { RecursoNaoEncontradoError } from "../../main/exception/recursoNaoEncontradoError";

afterEach(() => {
    jest.restoreAllMocks()
})

test("Deve converter aluguelDTO para dominio aluguel", () => {
    let aluguelDTO = {
        idLivro: 1,
        matricula: 2
    }

    let mockLivro = {
        isbn: 1,
        nome: "Livro 1",
        autores: [2],
        editora: "Editora A",
        anoPublicacao: "01/01/1999",
        quantidade: 1
    }

    let mockCliente = {
        matricula: 2,
        nome: "Adalto",
        telefone: "51 94054-2394"
    }

    jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2023-06-17T00:00:00Z').valueOf());
    jest.spyOn(livroRepository, "temLivrosCadastrados").mockImplementation(() => true)
    jest.spyOn(livroRepository, "buscarPorIdLivro").mockImplementation(() => mockLivro)
    jest.spyOn(clienteRepository, "buscaClientePorMatricula").mockImplementation(() => mockCliente)

    let aluguel = converter(aluguelDTO)

    let expectedAluguel = new Aluguel(true, mockLivro, "17/06/2023", "24/06/2023", mockCliente)

    expect(aluguel).toEqual(expectedAluguel)
})

test("Deve retornar erro quando nao tiver nenhum livro cadastrado no banco", () => {
    let aluguelDTO = {
        idLivro: 1,
        matricula: 2
    }

    jest.spyOn(livroRepository, "temLivrosCadastrados").mockImplementation(() => false)

    expect(() => converter(aluguelDTO)).toThrow(new RecursoNaoEncontradoError("Livro nao existe"))
})

test("Deve retornar erro quando o livro do aluguel for inexistente", () => {
    let aluguelDTO = {
        idLivro: 1,
        matricula: 2
    }

    jest.spyOn(livroRepository, "temLivrosCadastrados").mockImplementation(() => true)
    jest.spyOn(livroRepository, "buscarPorIdLivro").mockImplementation(() => null)

    expect(() => converter(aluguelDTO)).toThrow(new RecursoNaoEncontradoError("Livro nao existe"))
})

test("Deve retornar erro o cliente do aluguel for inexistente", () => {
    let aluguelDTO = {
        idLivro: 1,
        matricula: 2
    }

    let mockLivro = {
        isbn: 1,
        nome: "Livro 1",
        autores: [2],
        editora: "Editora A",
        anoPublicacao: "01/01/1999",
        quantidade: 1
    }

    jest.spyOn(livroRepository, "temLivrosCadastrados").mockImplementation(() => true)
    jest.spyOn(livroRepository, "buscarPorIdLivro").mockImplementation(() => mockLivro)
    jest.spyOn(clienteRepository, "buscaClientePorMatricula").mockImplementation(() => null)

    expect(() => converter(aluguelDTO)).toThrow(new RecursoNaoEncontradoError("Cliente nao encontrado"))
})
