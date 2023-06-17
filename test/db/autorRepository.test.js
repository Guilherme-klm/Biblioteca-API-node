import { temAutoresCadastrados, inserir, naoExisteAutor, existeAutor, mockAutores } from '../../main/db/autorRepository'

afterEach(() => {
    mockAutores([])
})

describe('Funcao: temAutoresCadastrados', () => {
    test('Deve retornar verdadeiro quando tiver autores cadastrados', () => {
        let autores = [
            {
                nome: "Jose Stifler",
                origem: "USA"
            }
        ]

        mockAutores(autores)

        let possuiAutoresCadastrados = temAutoresCadastrados()

        expect(possuiAutoresCadastrados).toBeTruthy()
    });

    test('Deve retornar falso quando nao tiver nenhum autor cadastrado', () => {
        let possuiAutoresCadastrados = temAutoresCadastrados()

        expect(possuiAutoresCadastrados).toBeFalsy()
    });
});

describe('Funcao: naoExisteAutor', () => {
    test('Deve retornar verdadeiro quando ID do autor for inexistente', () => {
        let autores = [
            {
                id: 1,
                nome: "Jose Stifler",
                origem: "USA"
            }
        ]

        mockAutores(autores)

        let autorInexistente = naoExisteAutor(2)

        expect(autorInexistente).toBeTruthy()
    });

    test('Deve retornar falso quando Id do autor for existente', () => {
        let autores = [
            {
                id: 1,
                nome: "Jose Stifler",
                origem: "USA"
            }
        ]

        mockAutores(autores)

        let autorInexistente = naoExisteAutor(1)

        expect(autorInexistente).toBeFalsy()
    });

    test('Deve retornar falso quando nao existir nenhum autor salvo', () => {
        let autorInexistente = naoExisteAutor(1)

        expect(autorInexistente).toBeFalsy()
    });
});

describe('Funcao: existeAutor', () => {
    test('Deve retornar verdadeiro quando autor novo ja estiver sido cadastrado', () => {
        let autores = [
            {
                id: 1,
                nome: "Jose Stifler",
                origem: "USA"
            }
        ]

        let newAutor = {
            nome: autores[0].nome,
            origem: autores[0].origem
        }

        mockAutores(autores)

        let autorExistente = existeAutor(newAutor)

        expect(autorExistente).toBeTruthy()
    });

    test('Deve retornar falso quando autor novo nao constar como salvo na base', () => {
        let autores = [
            {
                id: 1,
                nome: "Jose Stifler",
                origem: "USA"
            }
        ]

        let newAutor = {
            nome: "Gelson Faria",
            origem: "Franca"
        }

        mockAutores(autores)

        let autorExistente = existeAutor(newAutor)

        expect(autorExistente).toBeFalsy()
    });

    test('Deve retornar falso quando nao existir nenhum autor salvo', () => {
        let autorExistente = existeAutor(1)

        expect(autorExistente).toBeFalsy()
    });
});

describe('Funcao: inserir', () => {
    test('Deve inserir novo autor', () => {
        let newAutor = {
            nome: "Gelson Faria",
            origem: "Franca"
        }

        jest.spyOn(Math, "floor").mockImplementation(() => 1)

        let id = inserir(newAutor)

        expect(id).toBe(1)

        jest.restoreAllMocks()
    });
});