import livroRepository from "../../main/db/livroRepository";

afterEach(() => {
    livroRepository.mockLivros([])
})

describe('Funcao: temLivrosCadastrados', () => {
    test('Deve retornar verdadeiro quando possuir livros cadastrados', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 1
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let temLivrosCadastrados = livroRepository.temLivrosCadastrados()
    
        expect(temLivrosCadastrados).toBeTruthy()
    })
    
    test('Deve retornar falso quando nao tiver livros cadastrados', () => {
        let temLivrosCadastrados = livroRepository.temLivrosCadastrados()
    
        expect(temLivrosCadastrados).toBeFalsy()
    });
});

describe('Funcao: buscaLivrosDisponiveis', () => {
    test('Deve retornar todos os livros disponiveis para alugar', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 1
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livrosDisponiveis = livroRepository.buscaLivrosDisponiveis()
    
        expect(livrosDisponiveis).toEqual(mockLivros)
    });

    test('Nao deve retornar nenhum livro pois todos os livros estao indisponiveis', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 0
            }
        ]
        
        livroRepository.mockLivros(mockLivros)

        let livrosDisponiveis = livroRepository.buscaLivrosDisponiveis()
    
        expect(livrosDisponiveis).toEqual([])
    });
});

describe('Funcao: buscarTodosLivros', () => {
    test('Deve retornar buscar todos os livros da biblioteca', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 0
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.buscarTodosLivros()
    
        expect(livros).toEqual(mockLivros)
    });

    test('Deve retornar nenhum livro pois nao existe nenhum livro cadastrado', () => {
        let livros = livroRepository.buscarTodosLivros()
    
        expect(livros).toEqual([])
    });
});

describe('Funcao: buscarPorIdLivro', () => {
    test('Deve retornar um livro buscando pelo ISBN dele', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.buscarPorIdLivro(1)
    
        expect(livros).toEqual(mockLivros[0])
    });

    test('Deve retornar nenhum livro quando passar um ISBN inexistente', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.buscarPorIdLivro(2)
    
        expect(livros).toBeNull()
    });
});

describe('Funcao: buscarPorIdAutor', () => {
    test('Deve retornar livros buscando pelo ID do ator', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            },
            {
                isbn: 2,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora B",
                anoPublicacao: "01/01/1999",
                quantidade: 3
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.buscarPorIdAutor(2)
    
        expect(livros).toEqual(mockLivros)
    });

    test('Deve retornar nenhum livro quando ID do autor for inexistente', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 1",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            },
            {
                isbn: 2,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora B",
                anoPublicacao: "01/01/1999",
                quantidade: 3
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.buscarPorIdAutor(3)
    
        expect(livros).toEqual([])
    });
});

describe('Funcao: buscarPorNomeLivro', () => {
    test('Deve retornar livros buscando pelo nome dele', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            },
            {
                isbn: 2,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora B",
                anoPublicacao: "01/01/1999",
                quantidade: 3
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.buscarPorNomeLivro("Livro 2")
    
        expect(livros).toEqual(mockLivros)
    });

    test('Deve retornar nenhum livro quando nome do livro for inexistente', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            },
            {
                isbn: 2,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora B",
                anoPublicacao: "01/01/1999",
                quantidade: 3
            }
        ]
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.buscarPorNomeLivro("Livro 3")
    
        expect(livros).toEqual([])
    });
});

describe('Funcao: existeLivro', () => {
    test('Deve retornar falso quando livro novo é exatamente diferente dos outros salvos', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            },
            {
                isbn: 2,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora B",
                anoPublicacao: "01/01/1999",
                quantidade: 3
            }
        ]
    
        let newLivro = {
            nome: "Livro 3",
            autores: [4],
            editora: "Editora C",
            anoPublicacao: "01/01/2000",
            quantidade: 1
        }
        
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.existeLivro(newLivro)
    
        expect(livros).toBeFalsy()
    });

    test('Deve retornar verdadeiro quando novo livro ja estiver sido cadastrado', () => {
        let mockLivros = [
            {
                isbn: 1,
                nome: "Livro 2",
                autores: [2],
                editora: "Editora A",
                anoPublicacao: "01/01/1999",
                quantidade: 5
            },
            {
                isbn: 2,
                nome: "Livro 2",
                autores: [2, 3],
                editora: "Editora B",
                anoPublicacao: "01/01/1999",
                quantidade: 3
            },
            {
                isbn: 3,
                nome: "Livro 3",
                autores: [3],
                editora: "Editora C",
                anoPublicacao: "01/01/1999",
                quantidade: 7
            }
        ]
    
        livroRepository.mockLivros(mockLivros)
    
        let livros = livroRepository.existeLivro(mockLivros[1])
    
        expect(livros).toBeTruthy()
    });
});

describe('Funcao: inserir', () => {
    test('Deve inserir novo livro e retornar isbn do livro cadastrado', () => {
        let newLivro = {
            nome: "Livro 3",
            autores: [4],
            editora: "Editora C",
            anoPublicacao: "01/01/2000",
            quantidade: 1
        }
    
        jest.spyOn(Math, "floor").mockImplementation(() => 1)
    
        let isbn = livroRepository.inserir(newLivro)
    
        expect(isbn).toBe(1)
    
        jest.restoreAllMocks()
    });
});
