import clienteAlugouTresLivros from "../../../main/validations/aluguelLivro/clienteAlugouTresLivros";
import aluguelRepository from "../../../main/db/aluguelRepository";

afterEach(() => {
    jest.restoreAllMocks()
})

describe("Retorna erro", () => {
    test("Retorna erro quando cliente estiver alugando o quarto livro", async() => {
        let alugueis = [
            {
                id: 1,
                ativo: true,
                livro: {
                    lvr_isbn: 1,
                    lvr_nome: 'livro',
                    lvr_autores: [ 10 ],
                    lvr_editora: 'editora 222',
                    lvr_anoPublicacao: '20/04/1999',
                    lvr_quantidade: 5
                },
                dataRetirada: '08/06/2023',
                dataDevolucaoProgramado: '15/06/2023',
                dataDevolucao: null,
                multa: 0,
                cliente: {
                    cli_matricula: 2,
                    cli_nome: 'Guilherme Karam',
                    cli_telefone: '51 98423-9203'
                }
            },
            {
                id: 2,
                ativo: true,
                livro: {
                    lvr_isbn: 2,
                    lvr_nome: 'livro',
                    lvr_autores: [ 10 ],
                    lvr_editora: 'editora 222',
                    lvr_anoPublicacao: '20/04/1999',
                    lvr_quantidade: 5
                },
                dataRetirada: '08/06/2023',
                dataDevolucaoProgramado: '15/06/2023',
                dataDevolucao: null,
                multa: 0,
                cliente: {
                    cli_matricula: 2,
                    cli_nome: 'Guilherme Karam',
                    cli_telefone: '51 98423-9203'
                }
            },
            {
                id: 3,
                ativo: true,
                livro: {
                    lvr_isbn: 3,
                    lvr_nome: 'livro',
                    lvr_autores: [ 10 ],
                    lvr_editora: 'editora 222',
                    lvr_anoPublicacao: '20/04/1999',
                    lvr_quantidade: 5
                },
                dataRetirada: '08/06/2023',
                dataDevolucaoProgramado: '15/06/2023',
                dataDevolucao: null,
                multa: 0,
                cliente: {
                    cli_matricula: 2,
                    cli_nome: 'Guilherme Karam',
                    cli_telefone: '51 98423-9203'
                }
            },
        ]

        jest.spyOn(aluguelRepository, 'buscaPorMatricula').mockImplementation(() => alugueis)

        let aluguel = {
            cliente: {
                cli_matricula: 2,
                cli_nome: 'Guilherme Karam',
                cli_telefone: '51 98423-9203'
            }
        }

        await clienteAlugouTresLivros.validar(aluguel).catch(e =>
            expect(e.message).toMatch("Nao é possivel retirar o livro pois o cliente ja tem 3 livros alugados")
        )
    })
})

describe("Nao retorna erro", () => {
    describe("Cliente sem nenhum aluguel", () => {
        test("Quando cliente for alugar livro, nao ira retornar erro pois ele nao tem nenhum livro alugado", async () => {
            let alugueis = [
                {
                    id: 1,
                    ativo: true,
                    livro: {
                        lvr_isbn: 1,
                        lvr_nome: 'livro',
                        lvr_autores: [ 10 ],
                        lvr_editora: 'editora 222',
                        lvr_anoPublicacao: '20/04/1999',
                        lvr_quantidade: 2
                    },
                    dataRetirada: '08/06/2023',
                    dataDevolucaoProgramado: '15/06/2023',
                    dataDevolucao: null,
                    multa: 0,
                    cliente: {
                        cli_matricula: 5,
                        cli_nome: 'Tom Marciano',
                        cli_telefone: '51 67657-3434'
                    }
                }
            ]
        
            jest.spyOn(aluguelRepository, 'buscaPorMatricula').mockImplementation(() => alugueis)
            
            let aluguel = {
                cliente: {
                    cli_matricula: 2,
                    cli_nome: 'Guilherme Karam',
                    cli_telefone: '51 98423-9203'
                }
            }
    
            let result = await clienteAlugouTresLivros.validar(aluguel)
    
            expect(result).toBeUndefined()
        })
    })

    describe("Nenhum aluguel de livros", () => {
        test("Quando cliente for alugar livro, nao ira retornar erro pois nao existe nenhum livro na biblioteca alugado", async() => {
            let aluguel = {
                cliente: {
                    cli_matricula: 2,
                    cli_nome: 'Guilherme Karam',
                    cli_telefone: '51 98423-9203'
                }
            }
    
            let result = await clienteAlugouTresLivros.validar(aluguel)
    
            expect(result).toBeUndefined()
        })
    })
})
