import { possuiAluguel, todosAlugueis, buscaPorId, buscaPorMatricula, alugar, mockAlugueis } from '../../main/db/aluguelRepository'

afterEach(() => {
    mockAlugueis([])
})

describe('Funcao: possuiAluguel', () => {
    test('Deve retornar verdadeiro quando tiver alugueis cadastrados', () => {
        let alugueis = [
            {
                id: 1,
                ativo: true,
                livro: {
                    isbn: 1,
                    nome: "Harry Potter",
                    autores: [
                        1,
                        2,
                        3
                    ],
                    editora: "Editora ABC",
                    anoPublicacao: "01/01/2030",
                    quantidade: 5
                },
                dataRetirada: "01/01/2050",
                dataDevolucaoProgramado: "08/01/2050",
                dataDevolucao: "05/01/2050",
                multa: 0,
                cliente: {
                    matricula: 1,
                    nome: "Alberto",
                    telefone: "51 984630283"
                }
            }
        ]

        mockAlugueis(alugueis)

        let temAluguelCadastrado = possuiAluguel()

        expect(temAluguelCadastrado).toBeTruthy()
    });

    test('Deve retornar falso quando nao tiver aluguel cadastrado', () => {
        let temAluguelCadastrado = possuiAluguel()

        expect(temAluguelCadastrado).toBeFalsy()
    });
});

describe('Funcao: todosAlugueis', () => {
    test('Deve retornar todos os alugueis cadastrados', () => {
        const alugueisMock = [
            {
                id: 1,
                ativo: true,
                livro: {
                    isbn: 1,
                    nome: "Harry Potter",
                    autores: [
                        1,
                        2,
                        3
                    ],
                    editora: "Editora ABC",
                    anoPublicacao: "01/01/2030",
                    quantidade: 5
                },
                dataRetirada: "01/01/2050",
                dataDevolucaoProgramado: "08/01/2050",
                dataDevolucao: "05/01/2050",
                multa: 0,
                cliente: {
                    matricula: 1,
                    nome: "Alberto",
                    telefone: "51 984630283"
                }
            }
        ]

        mockAlugueis(alugueisMock)

        let alugueis = todosAlugueis()

        expect(alugueis.length).toBe(1)
        expect(alugueis).toEqual(alugueisMock)
    });

    test('Deve retornar nenhum aluguel quando nao tiver nenhum salvo', () => {
        let alugueis = todosAlugueis()

        expect(alugueis.length).toBe(0)
        expect(alugueis).toEqual([])
    });
});

describe('Funcao: buscaPorId', () => {
    test('Deve retornar aluguel atraves do ID dele', () => {
        const alugueisMock = [
            {
                id: 1,
                ativo: true,
                livro: {
                    isbn: 1,
                    nome: "Harry Potter",
                    autores: [
                        1,
                        2,
                        3
                    ],
                    editora: "Editora ABC",
                    anoPublicacao: "01/01/2030",
                    quantidade: 5
                },
                dataRetirada: "01/01/2050",
                dataDevolucaoProgramado: "08/01/2050",
                dataDevolucao: "05/01/2050",
                multa: 0,
                cliente: {
                    matricula: 1,
                    nome: "Alberto",
                    telefone: "51 984630283"
                }
            }
        ]

        mockAlugueis(alugueisMock)

        let aluguel = buscaPorId(1)

        expect(aluguel).toEqual(alugueisMock[0])
    });

    test('Deve retornar null quando ID do aluguel for inexistente mas tem alugueis salvo', () => {
        const alugueisMock = [
            {
                id: 1,
                ativo: true,
                livro: {
                    isbn: 1,
                    nome: "Harry Potter",
                    autores: [
                        1,
                        2,
                        3
                    ],
                    editora: "Editora ABC",
                    anoPublicacao: "01/01/2030",
                    quantidade: 5
                },
                dataRetirada: "01/01/2050",
                dataDevolucaoProgramado: "08/01/2050",
                dataDevolucao: "05/01/2050",
                multa: 0,
                cliente: {
                    matricula: 1,
                    nome: "Alberto",
                    telefone: "51 984630283"
                }
            }
        ]

        mockAlugueis(alugueisMock)

        let aluguel = buscaPorId(2)

        expect(aluguel).toBeNull()
    });

    test('Deve retornar null quando nao tiver nenhum aluguel salvo', () => {
        let aluguel = buscaPorId(1)

        expect(aluguel).toBeNull()
    });
});

describe('Funcao: buscaPorMatricula', () => {
    test('Deve retornar aluguel atraves da matricula do cliente', () => {
        const alugueisMock = [
            {
                id: 1,
                ativo: true,
                livro: {
                    isbn: 1,
                    nome: "Harry Potter",
                    autores: [
                        1,
                        2,
                        3
                    ],
                    editora: "Editora ABC",
                    anoPublicacao: "01/01/2030",
                    quantidade: 5
                },
                dataRetirada: "01/01/2050",
                dataDevolucaoProgramado: "08/01/2050",
                dataDevolucao: "05/01/2050",
                multa: 0,
                cliente: {
                    matricula: 1,
                    nome: "Alberto",
                    telefone: "51 984630283"
                }
            }
        ]

        mockAlugueis(alugueisMock)

        let alugueis = buscaPorMatricula(1)

        expect(alugueis).toEqual(alugueisMock)
    });

    test('Deve retornar nenhum aluguel quando a matricula do cliente for inexistente na base', () => {
        const alugueisMock = [
            {
                id: 1,
                ativo: true,
                livro: {
                    isbn: 1,
                    nome: "Harry Potter",
                    autores: [
                        1,
                        2,
                        3
                    ],
                    editora: "Editora ABC",
                    anoPublicacao: "01/01/2030",
                    quantidade: 5
                },
                dataRetirada: "01/01/2050",
                dataDevolucaoProgramado: "08/01/2050",
                dataDevolucao: "05/01/2050",
                multa: 0,
                cliente: {
                    matricula: 1,
                    nome: "Alberto",
                    telefone: "51 984630283"
                }
            }
        ]

        mockAlugueis(alugueisMock)

        let alugueis = buscaPorMatricula(2)

        expect(alugueis).toEqual([])
    });

    test('Deve retornar nenhum aluguel quando nao tiver nenhum aluguel cadastrado', () => {
        let alugueis = buscaPorMatricula(2)

        expect(alugueis).toEqual([])
    });
});

describe('Funcao: alugar', () => {
    test('Deve alugar o livro', () => {
        let newAluguel = {
            ativo: true,
            livro: {
                isbn: 1,
                nome: "Harry Potter",
                autores: [
                    1,
                    2,
                    3
                ],
                editora: "Editora ABC",
                anoPublicacao: "01/01/2030",
                quantidade: 5
            },
            dataRetirada: "01/01/2050",
            dataDevolucaoProgramado: "08/01/2050",
            dataDevolucao: "05/01/2050",
            multa: 0,
            cliente: {
                matricula: 1,
                nome: "Alberto",
                telefone: "51 984630283"
            }
        }

        jest.spyOn(Math, "floor").mockImplementation(() => 1)

        let id = alugar(newAluguel)

        expect(1).toBe(id)
        expect(todosAlugueis()[0].livro.quantidade).toBe(4)

        jest.restoreAllMocks()
    });
});