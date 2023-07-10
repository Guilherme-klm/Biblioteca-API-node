import { converter } from "../../main/converter/cadastroClienteConverter";
import { Cliente } from "../../main/domain/cliente";
import  clienteRepository  from "../../main/db/clienteRepository";

afterEach(() => {
    jest.restoreAllMocks()
})

test("Deve converter clienteDTO no dominio cliente", async() => {
    let clienteDTO = {
        nome: "James Webb",
        telefone: "51 93042-3214"
    }

    let result = await converter(clienteDTO)

    expect(result).toEqual(new Cliente("James Webb", "51 93042-3214"))
})

test("Deve retornar erro quando passar nome do cliente vazio ou null", async() => {
    let clienteDTO = {
        nome: "",
        telefone: "51 93042-3214"
    }

    await converter(clienteDTO).catch(e => expect(e.message).toMatch("Nome do cliente é obrigatorio"))

    clienteDTO.nome = null
    
    await converter(clienteDTO).catch(e => expect(e.message).toMatch("Nome do cliente é obrigatorio"))
})

test("Deve retornar erro quando passar telefone do cliente vazio ou null", async() => {
    let clienteDTO = {
        nome: "James Webb",
        telefone: ""
    }

    await converter(clienteDTO).catch(e => expect(e.message).toMatch("Telefone do cliente é obrigatorio"))

    clienteDTO.telefone = null
    
    await converter(clienteDTO).catch(e => expect(e.message).toMatch("Telefone do cliente é obrigatorio"))
})

test("Deve retornar erro de cliente existente quando cliente estiver sendo cadastrado novamente", async () => {
    let clienteDTO = {
        nome: "James Webb",
        telefone: "51 93042-3214"
    }

    jest.spyOn(clienteRepository, 'existeCliente').mockImplementation(() => true)

    await converter(clienteDTO).catch(e => expect(e.message).toMatch('Cliente ja cadastrado'))
})