import { Autor } from "../../main/domain/autor";
import { converter } from "../../main/converter/cadastroAutorConverter";
import { RecursoNaoEncontradoError } from "../../main/exception/recursoNaoEncontradoError";
import { RecursoDuplicadoError } from "../../main/exception/recursoDuplicadoError";
import autorRepository  from "../../main/db/autorRepository";

test("Deve converter autorDTO no dominio autor", async() => {
    let autorDTO = {
        nome: "Alberto Stenio",
        origem: "Brasil"
    }

    let autor = await converter(autorDTO)

    expect(autor).toEqual(new Autor("Alberto Stenio", "Brasil"))
})

test("Deve retornar erro quando passar nome do autor vazio ou null", async() => {
    let autorDTO = {
        nome: "",
        origem: "Brasil"
    }

    await converter(autorDTO).catch(e => expect(e.message).toMatch("Nome do autor é obrigatorio"))

    autorDTO.nome = null

    await converter(autorDTO).catch(e => expect(e.message).toMatch("Nome do autor é obrigatorio"))
})

test("Deve retornar erro quando passar origem do autor vazio ou null", async() => {
    let autorDTO = {
        nome: "Alberto Stenio",
        origem: ""
    }

    await converter(autorDTO).catch(e => expect(e.message).toMatch("Origem do autor é obrigatorio"))

    autorDTO.origem = null

    await converter(autorDTO).catch(e => expect(e.message).toMatch("Origem do autor é obrigatorio"))
})

test("Deve retornar erro quando incluir um autor ja salvo na base", async() => {
    jest.spyOn(autorRepository, "temAutoresCadastrados").mockImplementation(() => true)
    jest.spyOn(autorRepository, "existeAutor").mockImplementation(() => true)

    let autorDTO = {
        nome: "Alberto Stenio",
        origem: "Brasil"
    }

    await converter(autorDTO).catch(e => expect(e.message).toMatch('Autor ja cadastrado'))
})