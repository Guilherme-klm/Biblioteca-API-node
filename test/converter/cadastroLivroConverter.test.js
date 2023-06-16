import { converterToDomain } from "../../main/converter/cadastroLivroConverter"
import { Livro } from "../../main/domain/livro"
import livroRepository from '../../main/db/livroRepository'
import autorRepository from '../../main/db/autorRepository'
import { RecursoDuplicadoError } from "../../main/exception/recursoDuplicadoError"
import { RecursoNaoEncontradoError } from "../../main/exception/recursoNaoEncontradoError"
import { CustomTypeError } from "../../main/exception/customTypeError"

afterEach(() => {
    jest.restoreAllMocks()
})

describe("Sucesso", () => {
    test("Deve converter livroDTO para dominio livro", () => {
        let livroDTO = {
            nome: "Livro X",
            autores: [1],
            editora: "Editora A",
            anoPublicacao: "01/01/2000",
            quantidade: 3
        }
    
        jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)
        jest.spyOn(livroRepository, "temLivrosCadastrados").mockImplementation(() => true)
        jest.spyOn(livroRepository, "existeLivro").mockImplementation(() => false)
    
        let livro = converterToDomain(livroDTO)
    
        let expectedLivro = new Livro("Livro X", [1], "Editora A", "01/01/2000", 3)
    
        expect(livro).toEqual(expectedLivro)
    })    
})

describe("Erro", () => {
    
    describe("Erro no nome do livro", () => {
        test("Deve retornar erro quando nome for vazio, tipo diferente de string ou null", () => {
            let livroDTO = {
                nome: "",
            }
    
            expect(() => converterToDomain(livroDTO)).toThrow(new RecursoNaoEncontradoError("Nome do livro é obrigatorio"))
        })

        test("Deve retornar erro quando nome for diferente de string", () => {
            let livroDTO = {
                nome: 1,
            }

            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo nome precisa ser do tipo string"))
        })

        test("Deve retornar erro quando nome for null", () => {
            let livroDTO = {
                nome: null,
            }

            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo nome precisa ser do tipo string"))
        })
    })
    
    describe("Erro nos autores do livro", () => {
        test("Deve retornar erro quando autor do livro nao for do tipo array", () => {
            let livroDTO = {
                nome: "Livro X",
                autores: 1,
            }
            
            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo autores precisa ser do tipo lista de inteiros"))
        })

        test("Deve retornar erro quando autor do livro for null", () => {
            let livroDTO = {
                nome: "Livro X",
                autores: null,
            }
            
            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo autores precisa ser do tipo lista de inteiros"))
        })

        test("Deve retornar erro quando lista de autores for vazia", () => {
            let livroDTO = {
                nome: "Livro X",
                autores: [],
            }
            
            expect(() => converterToDomain(livroDTO)).toThrow(new RecursoNaoEncontradoError("Autores do livro é obrigatorio"))
        })

        test("Deve retornar erro quando algum valor da lista de autores for do tipo diferente de numero", () => {
            let livroDTO = {
                nome: "Livro X",
                autores: [1, "2"],
            }
            
            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Id do autor precisa ser do tipo numero"))
        })

        test("Deve retornar erro quando autor nao for encontrado no banco", () => {
            let livroDTO = {
                nome: "Livro X",
                autores: [1],
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => true)
            
            expect(() => converterToDomain(livroDTO)).toThrow(new RecursoNaoEncontradoError("Autor(es) nao existe(m), verifique se esta passando os Id(s) corretos"))
        })

    })

    describe("Erro na editora do livro", () => {
        test("Deve retornar erro quando editora for vazia", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: ""
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)
    
            expect(() => converterToDomain(livroDTO)).toThrow(new RecursoNaoEncontradoError("Editora do livro é obrigatorio"))
        })

        test("Deve retornar erro quando o tipo da editora for diferente de string", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: 1
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo editora precisa ser do tipo string"))
        })

        test("Deve retornar erro quando a editora for null", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: null
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo editora precisa ser do tipo string"))
        })

    })

    describe("Erro no ano da publicacao do livro", () => {
        test("Deve retornar erro quando ano da publicacao for vazio", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: ""
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            expect(() => converterToDomain(livroDTO)).toThrow(new RecursoNaoEncontradoError("Ano publicacao do livro é obrigatorio"))
        })

        test("Deve retornar erro quando tipo do ano da publicacao for diferente de string", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: 1
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo anoPublicacao precisa ser do tipo string"))
        })

        test("Deve retornar erro quando ano da publicacao for null", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: null
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo anoPublicacao precisa ser do tipo string"))
        })
    })

    describe("Erro na quantidade do livro", () => {
        test("Deve retornar erro quando quantidade do livro for 0", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: "01/01/2000",
                quantidade: 0
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            expect(() => converterToDomain(livroDTO)).toThrow(new RecursoNaoEncontradoError("Quantidade do livro nao pode ser 0"))
        })

        test("Deve retornar erro quando tipo da quantidade do livro for diferente de numero", () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: "01/01/2000",
                quantidade: "1"
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            expect(() => converterToDomain(livroDTO)).toThrow(new CustomTypeError("Atributo quantidade precisa ser do tipo inteiro"))
        })
    })

    describe("Duplicacao de livro", () => {
        test("Deve retornar erro quando novo livro ja existe na base", () => {
            let livroDTO = {
                nome: "Livro X",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: "01/01/2000",
                quantidade: 3
            }
        
            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)
            jest.spyOn(livroRepository, "temLivrosCadastrados").mockImplementation(() => true)
            jest.spyOn(livroRepository, "existeLivro").mockImplementation(() => true)

            expect(() => converterToDomain(livroDTO)).toThrow(new RecursoDuplicadoError('Livro ja cadastrado', 400))
        })
    })
    
})
