import { possuiClientes, existeCliente, buscaCliente, buscaClientePorMatricula, inserir, mockClientes } from "../../main/db/clienteRepository";

afterEach(() => {
    mockClientes([])
})

describe('Funcao: possuiClientes', () => {

    test('Deve retornar verdadeiro quando tiver clientes cadastrados', () => {
        let clientes = [
            {
                matricula: 1,
                nome: 'Wagner Costa',
                telefone: '51 98423-9203'
            }
        ]

        mockClientes(clientes)

        let temClientes = possuiClientes()

        expect(temClientes).toBeTruthy()
    });
    
    test('Deve retornar falso quando nao tiver clientes cadastrados', () => {
        let temClientes = possuiClientes()

        expect(temClientes).toBeFalsy()
    });
});

describe('Funcao: existeCliente', () => {
    test('Deve retornar falso quando cliente novo nao existe na base', () => {
        let clientes = [
            {
                matricula: 1,
                nome: 'Wagner Costa',
                telefone: '51 98423-9203'
            }
        ]

        let newCliente = {
            nome: 'Armindo Souza',
            telefone: '51 94872-9602'
        }

        mockClientes(clientes)

        let temClientes = existeCliente(newCliente)

        expect(temClientes).toBeFalsy()
    });

    test('Deve retornar verdadeiro quando cliente novo ja foi cadastrado', () => {
        let clientes = [
            {
                matricula: 1,
                nome: 'Wagner Costa',
                telefone: '51 98423-9203'
            }
        ]

        let newCliente =  {
            nome: clientes[0].nome,
            telefone: clientes[0].telefone
        }

        mockClientes(clientes)

        let temClientes = existeCliente(newCliente)

        expect(temClientes).toBeTruthy()
    });
});

describe('Funcao: buscaCliente', () => {
    test('Deve retornar informacoes do cliente quando cliente buscado existe', () => {
        let clientes = [
            {
                matricula: 1,
                nome: 'Wagner Costa',
                telefone: '51 98423-9203'
            }
        ]

        let cliente =  {
            nome: clientes[0].nome,
            telefone: clientes[0].telefone
        }

        mockClientes(clientes)

        let clienteCarregado = buscaCliente(cliente)

        expect(clienteCarregado).toEqual(clientes[0])
    });

    test('Deve retornar null quando cliente buscado nao existe', () => {
        let clientes = [
            {
                matricula: 1,
                nome: 'Wagner Costa',
                telefone: '51 98423-9203'
            }
        ]

        let cliente =  {
            nome: "abc",
            telefone: "3438473894"
        }

        mockClientes(clientes)

        let clienteCarregado = buscaCliente(cliente)

        expect(clienteCarregado).toBeNull()
    });

    test('Deve retornar null quando nao possuir nenhum cliente cadastrado', () => {
        let cliente =  {
            nome: "abc",
            telefone: "3438473894"
        }

        let clienteCarregado = buscaCliente(cliente)

        expect(clienteCarregado).toBeNull()
    });
});

describe('Funcao: buscaClientePorMatricula', () => {
    test('Deve retornar informacoes do cliente quando matricula do cliente existe na base ', () => {
        let clientes = [
            {
                matricula: 1,
                nome: 'Wagner Costa',
                telefone: '51 98423-9203'
            }
        ]

        mockClientes(clientes)

        let clienteCarregado = buscaClientePorMatricula(1)

        expect(clienteCarregado).toEqual(clientes[0])
    });

    test('Deve retornar nenhum cliente quando matricula for inexistente', () => {
        let clientes = [
            {
                matricula: 1,
                nome: 'Wagner Costa',
                telefone: '51 98423-9203'
            }
        ]

        mockClientes(clientes)

        let clienteCarregado = buscaClientePorMatricula(2)

        expect(clienteCarregado).toBeNull()
    });

    test('Deve retornar nenhum cliente quando nao existir clientes cadastrados', () => {
        let clienteCarregado = buscaClientePorMatricula(1)

        expect(clienteCarregado).toBeNull()
    });
});

describe('Funcao: inserir', () => {
    test('Deve inserir cliente ', () => {
        let newCliente =  {
            nome: "abc",
            telefone: "3438473894"
        }

        jest.spyOn(Math, "floor").mockImplementation(() => 1)

        let id = inserir(newCliente)

        expect(1).toBe(id)

        jest.restoreAllMocks()
    });
});