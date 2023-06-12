import clienteAlugouTresLivros from "../../../main/validations/aluguelLivro/clienteAlugouTresLivros";
import aluguelRepository from "../../../main/db/aluguelRepository";
import { BusinessError } from "../../../main/exception/businessError";

afterEach(() => {
    jest.restoreAllMocks()
})

describe("Retorna erro", () => {
    test("Retorna erro quando cliente estiver alugando o quarto livro", () => {
        let alugueis = [
            {
                id: 1,
                ativo: true,
                livro: {
                    isbn: 1,
                    nome: 'livro',
                    autores: [ 10 ],
                    editora: 'editora 222',
                    anoPublicacao: '20/04/1999',
                    quantidade: 5
                },
                dataRetirada: '08/06/2023',
                dataDevolucaoProgramado: '15/06/2023',
                dataDevolucao: null,
                multa: 0,
                cliente: {
                    matricula: 2,
                    nome: 'Guilherme Karam',
                    telefone: '51 98423-9203'
                }
            },
            {
                id: 2,
                ativo: true,
                livro: {
                    isbn: 2,
                    nome: 'livro',
                    autores: [ 10 ],
                    editora: 'editora 222',
                    anoPublicacao: '20/04/1999',
                    quantidade: 5
                },
                dataRetirada: '08/06/2023',
                dataDevolucaoProgramado: '15/06/2023',
                dataDevolucao: null,
                multa: 0,
                cliente: {
                    matricula: 2,
                    nome: 'Guilherme Karam',
                    telefone: '51 98423-9203'
                }
            },
            {
                id: 3,
                ativo: true,
                livro: {
                    isbn: 3,
                    nome: 'livro',
                    autores: [ 10 ],
                    editora: 'editora 222',
                    anoPublicacao: '20/04/1999',
                    quantidade: 5
                },
                dataRetirada: '08/06/2023',
                dataDevolucaoProgramado: '15/06/2023',
                dataDevolucao: null,
                multa: 0,
                cliente: {
                    matricula: 2,
                    nome: 'Guilherme Karam',
                    telefone: '51 98423-9203'
                }
            },
        ]
    
        jest.spyOn(aluguelRepository, 'buscaPorMatricula').mockImplementation(() => alugueis)

        let aluguel = {
            cliente: {
                matricula: 2,
                nome: 'Guilherme Karam',
                telefone: '51 98423-9203'
            }
        }
    
        expect(() => clienteAlugouTresLivros.validar(aluguel)).toThrow(new BusinessError("Nao é possivel retirar o livro pois o cliente ja tem 3 livros alugados"))
    })
})

describe("Nao retorna erro", () => {
    describe("Cliente sem nenhum aluguel", () => {
        test("Quando cliente for alugar livro, nao ira retornar erro pois ele nao tem nenhum livro alugado", () => {
            let alugueis = [
                {
                    id: 1,
                    ativo: true,
                    livro: {
                        isbn: 1,
                        nome: 'livro',
                        autores: [ 10 ],
                        editora: 'editora 222',
                        anoPublicacao: '20/04/1999',
                        quantidade: 2
                    },
                    dataRetirada: '08/06/2023',
                    dataDevolucaoProgramado: '15/06/2023',
                    dataDevolucao: null,
                    multa: 0,
                    cliente: {
                        matricula: 5,
                        nome: 'Tom Marciano',
                        telefone: '51 67657-3434'
                    }
                }
            ]
        
            jest.spyOn(aluguelRepository, 'buscaPorMatricula').mockImplementation(() => alugueis)
            
            let aluguel = {
                cliente: {
                    matricula: 2,
                    nome: 'Guilherme Karam',
                    telefone: '51 98423-9203'
                }
            }
    
            let result = clienteAlugouTresLivros.validar(aluguel)
    
            expect(result).toBeUndefined()
        })
    })

    describe("Nenhum aluguel de livros", () => {
        test("Quando cliente for alugar livro, nao ira retornar erro pois nao existe nenhum livro na biblioteca alugado", () => {
            let aluguel = {
                cliente: {
                    matricula: 2,
                    nome: 'Guilherme Karam',
                    telefone: '51 98423-9203'
                }
            }
    
            let result = clienteAlugouTresLivros.validar(aluguel)
    
            expect(result).toBeUndefined()
        })
    })
})
