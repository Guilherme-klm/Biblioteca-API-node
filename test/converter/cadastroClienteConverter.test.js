import { converter } from "../../main/converter/cadastroClienteConverter";
import { Cliente } from "../../main/domain/cliente";
import { RecursoNaoEncontradoError } from "../../main/exception/recursoNaoEncontradoError";
import { RecursoDuplicadoError } from "../../main/exception/recursoDuplicadoError";
import  clienteRepository  from "../../main/db/clienteRepository";

afterEach(() => {
    jest.restoreAllMocks()
})

test("Deve converter clienteDTO no dominio cliente", () => {
    let clienteDTO = {
        nome: "James Webb",
        telefone: "51 93042-3214"
    }

    let result = converter(clienteDTO)

    expect(result).toEqual(new Cliente("James Webb", "51 93042-3214"))
})

test("Deve retornar erro quando passar nome do cliente vazio ou null", () => {
    let clienteDTO = {
        nome: "",
        telefone: "51 93042-3214"
    }

    expect(() => converter(clienteDTO)).toThrow(new RecursoNaoEncontradoError("Nome do cliente é obrigatorio"))

    clienteDTO.nome = null
    
    expect(() => converter(clienteDTO)).toThrow(new RecursoNaoEncontradoError("Nome do cliente é obrigatorio"))
})

test("Deve retornar erro quando passar telefone do cliente vazio ou null", () => {
    let clienteDTO = {
        nome: "James Webb",
        telefone: ""
    }

    expect(() => converter(clienteDTO)).toThrow(new RecursoNaoEncontradoError("Telefone do cliente é obrigatorio"))

    clienteDTO.telefone = null
    
    expect(() => converter(clienteDTO)).toThrow(new RecursoNaoEncontradoError("Telefone do cliente é obrigatorio"))
})

test("Deve retornar erro de cliente existente quando cliente estiver sendo cadastrado novamente", () => {
    let clienteDTO = {
        nome: "James Webb",
        telefone: "51 93042-3214"
    }

    jest.spyOn(clienteRepository, 'existeCliente').mockImplementation(() => true)

    expect(() => converter(clienteDTO)).toThrow(new RecursoDuplicadoError('Cliente ja cadastrado', 400))
})