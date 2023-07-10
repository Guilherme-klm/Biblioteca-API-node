import { converterToDomain } from "../../main/converter/cadastroLivroConverter"
import { Livro } from "../../main/domain/livro"
import livroRepository from '../../main/db/livroRepository'
import autorRepository from '../../main/db/autorRepository'

afterEach(() => {
    jest.restoreAllMocks()
})

describe("Sucesso", () => {
    test("Deve converter livroDTO para dominio livro", async() => {
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
    
        let livro = await converterToDomain(livroDTO)
    
        let expectedLivro = new Livro("Livro X", [1], "Editora A", "01/01/2000", 3)
    
        expect(livro).toEqual(expectedLivro)
    })    
})

describe("Erro", () => {
    
    describe("Erro no nome do livro", () => {
        test("Deve retornar erro quando nome for vazio, tipo diferente de string ou null", async() => {
            let livroDTO = {
                nome: "",
            }
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Nome do livro é obrigatorio"))
        })

        test("Deve retornar erro quando nome for diferente de string", async() => {
            let livroDTO = {
                nome: 1,
            }
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo nome precisa ser do tipo string"))
        })

        test("Deve retornar erro quando nome for null", async() => {
            let livroDTO = {
                nome: null,
            }

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo nome precisa ser do tipo string"))
        })
    })
    
    describe("Erro nos autores do livro", () => {
        test("Deve retornar erro quando autor do livro nao for do tipo array", async() => {
            let livroDTO = {
                nome: "Livro X",
                autores: 1,
            }
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo autores precisa ser do tipo lista de inteiros"))
        })

        test("Deve retornar erro quando autor do livro for null", async() => {
            let livroDTO = {
                nome: "Livro X",
                autores: null,
            }
            
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo autores precisa ser do tipo lista de inteiros"))
        })

        test("Deve retornar erro quando lista de autores for vazia", async() => {
            let livroDTO = {
                nome: "Livro X",
                autores: [],
            }
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Autores do livro é obrigatorio"))
        })

        test("Deve retornar erro quando algum valor da lista de autores for do tipo diferente de numero", async() => {
            let livroDTO = {
                nome: "Livro X",
                autores: [1, "2"],
            }
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Id do autor precisa ser do tipo numero"))
        })

        test("Deve retornar erro quando autor nao for encontrado no banco", async() => {
            let livroDTO = {
                nome: "Livro X",
                autores: [1],
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => true)
            
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Autor(es) nao existe(m), verifique se esta passando os Id(s) corretos"))
        })

    })

    describe("Erro na editora do livro", () => {
        test("Deve retornar erro quando editora for vazia", async() => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: ""
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)
            
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Editora do livro é obrigatorio"))
        })

        test("Deve retornar erro quando o tipo da editora for diferente de string", async() => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: 1
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo editora precisa ser do tipo string"))
        })

        test("Deve retornar erro quando a editora for null", async() => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: null
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)
            
            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo editora precisa ser do tipo string"))
        })

    })

    describe("Erro no ano da publicacao do livro", () => {
        test("Deve retornar erro quando ano da publicacao for vazio", async() => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: ""
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Ano publicacao do livro é obrigatorio"))
        })

        test("Deve retornar erro quando tipo do ano da publicacao for diferente de string", async() => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: 1
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo anoPublicacao precisa ser do tipo string"))
        })

        test("Deve retornar erro quando ano da publicacao for null", async() => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: null
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)  

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo anoPublicacao precisa ser do tipo string"))
        })
    })

    describe("Erro na quantidade do livro", () => {
        test("Deve retornar erro quando quantidade do livro for 0", async() => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: "01/01/2000",
                quantidade: 0
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Quantidade do livro nao pode ser 0"))
        })

        test("Deve retornar erro quando tipo da quantidade do livro for diferente de numero", async () => {
            let livroDTO = {
                nome: "Livro B",
                autores: [1],
                editora: "Editora A",
                anoPublicacao: "01/01/2000",
                quantidade: "1"
            }

            jest.spyOn(autorRepository, "naoExisteAutor").mockImplementation(() => false)

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch("Atributo quantidade precisa ser do tipo inteiro"))
        })
    })

    describe("Duplicacao de livro", () => {
        test("Deve retornar erro quando novo livro ja existe na base", async() => {
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

            await converterToDomain(livroDTO).catch(e => expect(e.message).toMatch('Livro ja cadastrado'))
        })
    })
    
})
