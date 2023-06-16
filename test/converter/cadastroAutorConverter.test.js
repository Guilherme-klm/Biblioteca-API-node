import { Autor } from "../../main/domain/autor";
import { converter } from "../../main/converter/cadastroAutorConverter";
import { RecursoNaoEncontradoError } from "../../main/exception/recursoNaoEncontradoError";
import { RecursoDuplicadoError } from "../../main/exception/recursoDuplicadoError";
import autorRepository  from "../../main/db/autorRepository";

test("Deve converter autorDTO no dominio autor", () => {
    let autorDTO = {
        nome: "Alberto Stenio",
        origem: "Brasil"
    }

    let autor = converter(autorDTO)

    expect(autor).toEqual(new Autor("Alberto Stenio", "Brasil"))
})

test("Deve retornar erro quando passar nome do autor vazio ou null", () => {
    let autorDTO = {
        nome: "",
        origem: "Brasil"
    }

    expect(() => converter(autorDTO)).toThrow(new RecursoNaoEncontradoError("Nome do autor é obrigatorio"))

    autorDTO.nome = null

    expect(() => converter(autorDTO)).toThrow(new RecursoNaoEncontradoError("Nome do autor é obrigatorio"))
})

test("Deve retornar erro quando passar origem do autor vazio ou null", () => {
    let autorDTO = {
        nome: "Alberto Stenio",
        origem: ""
    }

    expect(() => converter(autorDTO)).toThrow(new RecursoNaoEncontradoError("Origem do autor é obrigatorio"))

    autorDTO.origem = null

    expect(() => converter(autorDTO)).toThrow(new RecursoNaoEncontradoError("Origem do autor é obrigatorio"))
})

test("Deve retornar erro quando incluir um autor ja salvo na base", () => {
    jest.spyOn(autorRepository, "temAutoresCadastrados").mockImplementation(() => true)
    jest.spyOn(autorRepository, "existeAutor").mockImplementation(() => true)

    let autorDTO = {
        nome: "Alberto Stenio",
        origem: "Brasil"
    }

    expect(() => converter(autorDTO)).toThrow(new RecursoDuplicadoError('Autor ja cadastrado', 400))

})